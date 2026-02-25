package com.ssgroup.shop.repository;


import com.ssgroup.shop.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByCart_UserId(Long userId);
  Optional<CartItem> findByCart_UserIdAndProduct_Id(Long userId, Long productId);
  void deleteByCart_UserId(Long userId);
}

