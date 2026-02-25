package com.ssgroup.shop.repository;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
  Optional<Category> findBySlug(String slug);
  boolean existsBySlug(String slug);
}
