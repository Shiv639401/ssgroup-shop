package com.ssgroup.shop.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ssgroup.shop.dto.order.OrderDetailsDto;
import com.ssgroup.shop.dto.order.OrderItemDto;
import com.ssgroup.shop.dto.order.OrderSummaryDto;
import com.ssgroup.shop.dto.order.RevenueDto;
import com.ssgroup.shop.entity.Order;
import com.ssgroup.shop.entity.OrderItem;
import com.ssgroup.shop.entity.OrderStatus;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.OrderRepository;

import jakarta.persistence.criteria.Predicate;

@Service
public class AdminOrderService {

    private final OrderRepository orders;

    public AdminOrderService(OrderRepository orders) {
        this.orders = orders;
    }

    private static final ZoneId ZONE = ZoneId.systemDefault();

    /* =========================================================
       PAGINATED + FILTERED ADMIN ORDERS (NOW RETURNS DTO PAGE)
    ========================================================== */
    public Page<OrderSummaryDto> adminOrders(
            String search,
            String status,
            String from,
            String to,
            int page,
            int size
    ) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(Sort.Direction.DESC, "createdAt")
        );

        Specification<Order> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Search by Order ID
            if (search != null && !search.isBlank()) {
                try {
                    Long id = Long.parseLong(search.trim());
                    predicates.add(cb.equal(root.get("id"), id));
                } catch (NumberFormatException ignored) { }
            }

            // Filter by Status
            if (status != null && !status.isBlank()) {
                try {
                    OrderStatus st = OrderStatus.valueOf(status.trim().toUpperCase());
                    predicates.add(cb.equal(root.get("status"), st));
                } catch (IllegalArgumentException e) {
                    throw new BadRequestException("Invalid order status: " + status);
                }
            }

            // Date From (from = yyyy-MM-dd)
            if (from != null && !from.isBlank()) {
                LocalDate fromDate = LocalDate.parse(from.trim());
                Instant fromInstant = fromDate.atStartOfDay(ZONE).toInstant();
                predicates.add(cb.greaterThanOrEqualTo(root.get("createdAt"), fromInstant));
            }

            // Date To (to = yyyy-MM-dd)
            if (to != null && !to.isBlank()) {
                LocalDate toDate = LocalDate.parse(to.trim());
                Instant toInstant = toDate.atTime(LocalTime.MAX).atZone(ZONE).toInstant();
                predicates.add(cb.lessThanOrEqualTo(root.get("createdAt"), toInstant));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };

        return orders.findAll(spec, pageable).map(this::toSummaryDto);
    }

    /* =========================================================
       MAPPER: ORDER -> SUMMARY DTO  (PUBLIC, USED BY CONTROLLER)
    ========================================================== */
    public OrderSummaryDto toSummaryDto(Order o) {
        LocalDateTime created = (o.getCreatedAt() == null)
                ? null
                : LocalDateTime.ofInstant(o.getCreatedAt(), ZONE);

        int itemsCount = (o.getItems() == null) ? 0 : o.getItems().size();

        double total = bdToDouble(o.getTotal());

        return new OrderSummaryDto(
                o.getId(),
                created,
                itemsCount,
                total,
                o.getStatus(),
                o.getTrackingNumber()
        );
    }

    private double bdToDouble(BigDecimal bd) {
        return bd == null ? 0.0 : bd.doubleValue();
    }

    /* =========================================================
       UPDATE ORDER STATUS
    ========================================================== */
    public Order updateStatus(Long id, String status) {

        Order order = orders.findById(id)
                .orElseThrow(() -> new BadRequestException("Order not found"));

        OrderStatus newStatus;

        try {
            newStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid order status: " + status);
        }

        order.setStatus(newStatus);

        // Auto tracking number only once
        if (newStatus == OrderStatus.SHIPPED &&
                (order.getTrackingNumber() == null ||
                 order.getTrackingNumber().isBlank())) {

            order.setTrackingNumber("TRK" + System.currentTimeMillis());
        }

        return orders.save(order);
    }

    /* =========================================================
       SINGLE ORDER
    ========================================================== */
    public Order getOrderById(Long id) {
        return orders.findById(id)
                .orElseThrow(() -> new BadRequestException("Order not found"));
    }

    /* =========================================================
       ORDER DETAILS (FIXED: METHOD EXISTS + INSTANT -> LDT)
    ========================================================== */
    /* =========================================================
    ORDER DETAILS
 ========================================================== */
 public OrderDetailsDto adminOrderDetails(Long id) {

     Order o = getOrderById(id);

     LocalDateTime created = (o.getCreatedAt() == null)
             ? null
             : LocalDateTime.ofInstant(o.getCreatedAt(), ZONE);

     String customerName = o.getShippingName();
     String customerEmail = (o.getUser() != null) ? o.getUser().getEmail() : null;

     String address = String.join(", ",
             nullSafe(o.getShippingAddress()),
             nullSafe(o.getShippingCity()),
             nullSafe(o.getShippingState()),
             nullSafe(o.getShippingPincode())
     ).replaceAll("(, )+", ", ").replaceAll("^,\\s*|,\\s*$", "");

     String paymentMethod = o.getPaymentMode();

     List<OrderItemDto> items = new ArrayList<>();

     if (o.getItems() != null) {
         for (OrderItem it : o.getItems()) {

             Long productId = null;
             String productName = null;

             if (it.getProduct() != null) {
                 productId = it.getProduct().getId();

                 // ⚠️ CHANGE THIS if your Product field name is different
                 productName = it.getProduct().getTitle();
                 // If Product has getName() use:
                 // productName = it.getProduct().getName();
             }

             double price = it.getUnitPrice() != null
                     ? it.getUnitPrice().doubleValue()
                     : 0.0;

             items.add(new OrderItemDto(
                     productId,
                     productName,
                     it.getQuantity(),
                     price
             ));
         }
     }

     return new OrderDetailsDto(
             o.getId(),
             created,
             customerName,
             customerEmail,
             address,
             paymentMethod,
             items,
             bdToDouble(o.getTotal()),
             o.getTrackingNumber(),
             o.getStatus()
     );
 }
    private String nullSafe(String s) {
        return s == null ? "" : s.trim();
    }

    /* =========================================================
       REVENUE (FIXED: METHOD EXISTS + INSTANT QUERIES)
    ========================================================== */
    public RevenueDto revenue(String filter) {
        // filter param future use ke liye rakha hai; DTO me 3 values always return kar rahe hain
        LocalDate today = LocalDate.now();
        Instant startToday = today.atStartOfDay(ZONE).toInstant();
        Instant endToday = today.atTime(LocalTime.MAX).atZone(ZONE).toInstant();

        Instant startMonth = today.withDayOfMonth(1).atStartOfDay(ZONE).toInstant();
        Instant now = Instant.now();

        double todayRevenue = revenueBetween(startToday, endToday);
        double monthRevenue = revenueBetween(startMonth, now);
        double totalRevenue = totalRevenue();

        return new RevenueDto(todayRevenue, monthRevenue, totalRevenue);
    }

    public double totalRevenue() {
        return orders.getTotalRevenue();
    }

    public double revenueBetween(Instant start, Instant end) {
        return orders.getRevenueBetween(start, end);
    }
}