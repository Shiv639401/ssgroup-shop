package com.ssgroup.shop.repository;



import com.ssgroup.shop.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
  List<WishlistItem> findByUser_Id(Long userId);
  Optional<WishlistItem> findByUser_IdAndProduct_Id(Long userId, Long productId);
  void deleteByUser_IdAndProduct_Id(Long userId, Long productId);
}
