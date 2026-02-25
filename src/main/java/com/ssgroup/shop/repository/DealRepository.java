package com.ssgroup.shop.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.Deal;

public interface DealRepository extends JpaRepository<Deal, Long> {
    Optional<Deal> findBySlug(String slug);
    boolean existsBySlug(String slug);
}