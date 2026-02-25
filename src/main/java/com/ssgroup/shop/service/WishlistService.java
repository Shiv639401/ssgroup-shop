package com.ssgroup.shop.service;



import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.entity.WishlistItem;
import com.ssgroup.shop.repository.NotFoundException;
import com.ssgroup.shop.repository.ProductRepository;
import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.repository.WishlistRepository;

@Service
public class WishlistService {

  private final WishlistRepository wishlist;
  private final UserRepository users;
  private final ProductRepository products;

  public WishlistService(WishlistRepository wishlist, UserRepository users, ProductRepository products) {
    this.wishlist = wishlist;
    this.users = users;
    this.products = products;
  }

  public List<WishlistItem> list(Long userId) {
    return wishlist.findByUser_Id(userId);
  }

  @Transactional
  public void toggle(Long userId, Long productId) {
    var existing = wishlist.findByUser_IdAndProduct_Id(userId, productId);
    if (existing.isPresent()) {
      wishlist.delete(existing.get());
      return;
    }
    User u = users.findById(userId).orElseThrow(() -> new NotFoundException("User not found"));
    Product p = products.findById(productId).orElseThrow(() -> new NotFoundException("Product not found"));

    wishlist.save(WishlistItem.builder().user(u).product(p).createdAt(Instant.now()).build());
  }

  public boolean isWishlisted(Long userId, Long productId) {
    return wishlist.findByUser_IdAndProduct_Id(userId, productId).isPresent();
  }
}
