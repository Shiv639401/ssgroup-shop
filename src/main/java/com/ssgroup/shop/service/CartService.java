package com.ssgroup.shop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.entity.Cart;
import com.ssgroup.shop.entity.CartItem;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.CartItemRepository;
import com.ssgroup.shop.repository.CartRepository;
import com.ssgroup.shop.repository.NotFoundException;
import com.ssgroup.shop.repository.ProductRepository;
import com.ssgroup.shop.repository.UserRepository;

import java.util.List;

@Service
public class CartService {

  private final CartRepository carts;
  private final CartItemRepository cartItems;
  private final UserRepository users;
  private final ProductRepository products;

  public CartService(CartRepository carts,
                     CartItemRepository cartItems,
                     UserRepository users,
                     ProductRepository products) {
    this.carts = carts;
    this.cartItems = cartItems;
    this.users = users;
    this.products = products;
  }

  /* ================= ENSURE CART ================= */

  public void ensureCart(Long userId) {
    carts.findById(userId).orElseGet(() -> {
      User u = users.findById(userId)
          .orElseThrow(() -> new NotFoundException("User not found"));
      return carts.save(Cart.builder().user(u).build());
    });
  }

  /* ================= ADD / INCREMENT ================= */

  @Transactional
  public void add(Long userId, Long productId, int qty) {

    ensureCart(userId);

    if (qty == 0) return;

    Product p = products.findById(productId)
        .orElseThrow(() -> new NotFoundException("Product not found"));

    if (p.getStock() <= 0)
      throw new BadRequestException("Out of stock");

    var existing = cartItems.findByCart_UserIdAndProduct_Id(userId, productId);

    if (existing.isPresent()) {

      CartItem item = existing.get();
      int newQty = item.getQuantity() + qty;

      // 🔥 If quantity becomes zero or less → remove item
      if (newQty <= 0) {
        cartItems.delete(item);
        return;
      }

      // Max limit safeguard
      if (newQty > 10)
        newQty = 10;

      item.setQuantity(Math.min(newQty, p.getStock()));

    } else {

      // prevent negative insert
      if (qty <= 0)
        return;

      Cart cart = carts.findById(userId).orElseThrow();

      cartItems.save(
          CartItem.builder()
              .cart(cart)
              .product(p)
              .quantity(Math.min(qty, p.getStock()))
              .build()
      );
    }
  }

  /* ================= DIRECT UPDATE ================= */

  @Transactional
  public void update(Long userId, Long productId, int qty) {

    Product p = products.findById(productId)
        .orElseThrow(() -> new NotFoundException("Product not found"));

    CartItem item = cartItems
        .findByCart_UserIdAndProduct_Id(userId, productId)
        .orElseThrow(() -> new NotFoundException("Item not in cart"));

    if (qty <= 0) {
      cartItems.delete(item);
      return;
    }

    item.setQuantity(Math.min(qty, p.getStock()));
  }

  /* ================= REMOVE ================= */

  @Transactional
  public void remove(Long userId, Long productId) {
    CartItem item = cartItems
        .findByCart_UserIdAndProduct_Id(userId, productId)
        .orElseThrow(() -> new NotFoundException("Item not in cart"));

    cartItems.delete(item);
  }

  /* ================= LIST ================= */

  public List<CartItem> list(Long userId) {
    ensureCart(userId);
    return cartItems.findByCart_UserId(userId);
  }

  /* ================= CLEAR ================= */

  @Transactional
  public void clear(Long userId) {
    cartItems.deleteByCart_UserId(userId);
  }
}