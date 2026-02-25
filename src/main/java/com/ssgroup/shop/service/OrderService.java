package com.ssgroup.shop.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.entity.CartItem;
import com.ssgroup.shop.entity.Order;
import com.ssgroup.shop.entity.OrderItem;
import com.ssgroup.shop.entity.OrderStatus;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.CartItemRepository;
import com.ssgroup.shop.repository.OrderRepository;
import com.ssgroup.shop.repository.ProductRepository;
import com.ssgroup.shop.repository.UserRepository;

@Service
public class OrderService {

  private final OrderRepository orders;
  private final UserRepository users;
  private final ProductRepository products;
  private final CartItemRepository cartItems;
  private final CouponService couponService;

  public OrderService(OrderRepository orders,
                      UserRepository users,
                      ProductRepository products,
                      CartItemRepository cartItems,
                      CouponService couponService) {
    this.orders = orders;
    this.users = users;
    this.products = products;
    this.cartItems = cartItems;
    this.couponService = couponService;
  }

  // ===============================
  // MY ORDERS
  // ===============================
  public List<Order> myOrders(Long userId) {
    return orders.findByUser_IdOrderByCreatedAtDesc(userId);
  }

  // ===============================
  // PLACE ORDER
  // ===============================
  @Transactional
  public Order placeOrder(Long userId,
                          String name,
                          String phone,
                          String address,
                          String paymentMode,
                          String couponCode) {

    User user = users.findById(userId)
        .orElseThrow(() -> new BadRequestException("User not found"));

    List<CartItem> items = cartItems.findByCart_UserId(userId);

    if (items.isEmpty())
        throw new BadRequestException("Cart is empty");

    BigDecimal subtotal = items.stream()
        .map(ci -> ci.getProduct().getPrice()
            .multiply(BigDecimal.valueOf(ci.getQuantity())))
        .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal shippingCharge =
        subtotal.compareTo(new BigDecimal("999")) >= 0
            ? BigDecimal.ZERO
            : new BigDecimal("50");

    BigDecimal discount = BigDecimal.ZERO;

    if (couponCode != null && !couponCode.isBlank()) {

        Long categoryId = items.get(0)
                .getProduct()
                .getCategory()
                .getId();

        discount = couponService.validateAndCalculate(
                couponCode,
                userId,
                subtotal,
                categoryId
        );
    }

    BigDecimal total = subtotal
        .subtract(discount)
        .add(shippingCharge);

    // STOCK REDUCTION
    for (CartItem ci : items) {

      Product p = products.findById(ci.getProduct().getId())
              .orElseThrow();

      if (p.getStock() < ci.getQuantity())
        throw new BadRequestException("Not enough stock: " + p.getTitle());

      p.setStock(p.getStock() - ci.getQuantity());
    }

    Order order = Order.builder()
        .user(user)
        .shippingName(name)
        .shippingPhone(phone)
        .shippingAddress(address)
        .paymentMode(paymentMode)
        .paymentStatus(
            paymentMode.equalsIgnoreCase("COD")
                ? "PENDING"
                : "INITIATED"
        )
        .status(OrderStatus.CREATED)
        .subtotal(subtotal)
        .discount(discount)
        .shippingCharge(shippingCharge)
        .total(total)
        .createdAt(Instant.now())
        .estimatedDeliveryDate(
            Instant.now().plusSeconds(5 * 24 * 3600)
        )
        .build();

    for (CartItem ci : items) {
      order.getItems().add(
          OrderItem.builder()
              .order(order)
              .product(ci.getProduct())
              .quantity(ci.getQuantity())
              .unitPrice(ci.getProduct().getPrice())
              .build()
      );
    }

    Order saved = orders.save(order);

    // clear cart
    cartItems.deleteByCart_UserId(userId);

    return saved;
  }

  // ===============================
  // UPDATE ORDER STATUS (Admin uses)
  // ===============================
  public void updateStatus(Long orderId, OrderStatus newStatus) {

    Order order = orders.findById(orderId)
            .orElseThrow();

    order.setStatus(newStatus);

    if (newStatus == OrderStatus.SHIPPED) {
      order.setTrackingNumber("TRK" + System.currentTimeMillis());
    }

    orders.save(order);
  }

  // ===============================
  // USER CANCEL ORDER
  // ===============================
  @Transactional
  public Order cancelOrder(Long userId, Long orderId) {

    Order order = orders.findById(orderId)
        .orElseThrow(() -> new BadRequestException("Order not found"));

    if (!order.getUser().getId().equals(userId)) {
      throw new BadRequestException("You cannot cancel this order");
    }

    // allow cancel only early
    if (order.getStatus() == OrderStatus.SHIPPED ||
        order.getStatus() == OrderStatus.DELIVERED) {
      throw new BadRequestException("Order cannot be cancelled now");
    }

    if (order.getStatus() == OrderStatus.CANCELLED) {
      throw new BadRequestException("Order already cancelled");
    }

    order.setStatus(OrderStatus.CANCELLED);
    order.setTrackingNumber(null);

    return orders.save(order);
  }

  // ===============================
  // USER RETURN REQUEST (DELIVERED only)
  // ===============================
  @Transactional
  public Order requestReturn(Long userId, Long orderId) {

    Order order = orders.findById(orderId)
        .orElseThrow(() -> new BadRequestException("Order not found"));

    if (!order.getUser().getId().equals(userId)) {
      throw new BadRequestException("Unauthorized");
    }

    if (order.getStatus() != OrderStatus.DELIVERED) {
      throw new BadRequestException("Only delivered orders can be returned");
    }

    order.setStatus(OrderStatus.RETURN_REQUESTED);
    return orders.save(order);
  }

  // ===============================
  // USER REPLACEMENT REQUEST (DELIVERED only)
  // ===============================
  @Transactional
  public Order requestReplacement(Long userId, Long orderId) {

    Order order = orders.findById(orderId)
        .orElseThrow(() -> new BadRequestException("Order not found"));

    if (!order.getUser().getId().equals(userId)) {
      throw new BadRequestException("Unauthorized");
    }

    if (order.getStatus() != OrderStatus.DELIVERED) {
      throw new BadRequestException("Only delivered orders can be replaced");
    }

    order.setStatus(OrderStatus.REPLACEMENT_REQUESTED);
    return orders.save(order);
  }
}