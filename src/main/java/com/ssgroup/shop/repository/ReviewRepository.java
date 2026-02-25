package com.ssgroup.shop.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {
  List<Review> findByProduct_IdOrderByCreatedAtDesc(Long productId);
  Optional<Review> findByUser_IdAndProduct_Id(Long userId, Long productId);
  long countByProduct_Id(Long productId);
}
