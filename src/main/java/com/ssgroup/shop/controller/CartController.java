package com.ssgroup.shop.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssgroup.shop.dto.cart.AddToCartRequest;
import com.ssgroup.shop.dto.cart.CartResponse;
import com.ssgroup.shop.dto.cart.UpdateCartItemRequest;
import com.ssgroup.shop.mapper.CartMapper;
import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.service.CartService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/cart")
public class CartController {

  private final CartService cart;
  private final UserRepository users;

  public CartController(CartService cart, UserRepository users) {
    this.cart = cart;
    this.users = users;
  }

  private Long uid(Authentication auth) {
    return users.findByEmail(auth.getName())
        .orElseThrow()
        .getId();
  }

  /* ================= VIEW CART ================= */

  @GetMapping
  public CartResponse view(Authentication auth) {
    return CartMapper.toResponse(cart.list(uid(auth)));
  }

  /* ================= ADD TO CART ================= */

  @PostMapping
  public CartResponse add(Authentication auth,
                          @Valid @RequestBody AddToCartRequest req) {

    Long userId = uid(auth);
    cart.add(userId, req.getProductId(), req.getQuantity());

    return CartMapper.toResponse(cart.list(userId));
  }

  /* ================= UPDATE QUANTITY ================= */

  @PutMapping
  public CartResponse update(Authentication auth,
                             @Valid @RequestBody UpdateCartItemRequest req) {

    Long userId = uid(auth);
    cart.update(userId, req.getProductId(), req.getQuantity());

    return CartMapper.toResponse(cart.list(userId));
  }

  /* ================= REMOVE ITEM ================= */

  @DeleteMapping("/{productId}")
  public CartResponse remove(Authentication auth,
                             @PathVariable Long productId) {

    Long userId = uid(auth);
    cart.remove(userId, productId);

    return CartMapper.toResponse(cart.list(userId));
  }
}