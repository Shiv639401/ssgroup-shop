package com.ssgroup.shop.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.CouponUsage;

public interface CouponUsageRepository extends JpaRepository<CouponUsage, Long> {

  Optional<CouponUsage> findByCoupon_IdAndUser_Id(Long couponId, Long userId);

  long countByCoupon_Id(Long couponId);
}
