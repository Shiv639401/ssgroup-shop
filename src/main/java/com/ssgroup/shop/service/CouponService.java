package com.ssgroup.shop.service;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.ssgroup.shop.entity.Coupon;
import com.ssgroup.shop.repository.CouponRepository;
import com.ssgroup.shop.repository.CouponUsageRepository;
import com.ssgroup.shop.repository.OrderRepository;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;
    private final CouponUsageRepository usageRepository;
    private final OrderRepository orderRepository;

    public BigDecimal validateAndCalculate(
            String code,
            Long userId,
            BigDecimal cartTotal,
            Long categoryId
    ) {

        Coupon coupon = couponRepository.findByCode(code)
                .orElseThrow(() -> new RuntimeException("Invalid coupon"));

        // 1️⃣ Active check
        if (!coupon.isActive())
            throw new RuntimeException("Coupon inactive");

        // 2️⃣ Expiry check
        if (coupon.getExpiresAt().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Coupon expired");

        // 3️⃣ Usage limit
        if (coupon.getUsageLimit() != null &&
                coupon.getUsedCount() >= coupon.getUsageLimit())
            throw new RuntimeException("Coupon usage limit reached");

        // 4️⃣ Min cart value
        if (cartTotal.compareTo(coupon.getMinCartValue()) < 0)
            throw new RuntimeException("Cart value too low");

        // 5️⃣ First time user check
        if (coupon.isFirstTimeUserOnly()) {
            boolean hasOrders =
                    !orderRepository.findByUser_IdOrderByCreatedAtDesc(userId).isEmpty();

            if (hasOrders)
                throw new RuntimeException("First time users only");
        }

        // 6️⃣ Category specific
        if (coupon.getApplicableCategory() != null &&
                !coupon.getApplicableCategory().getId().equals(categoryId)) {
            throw new RuntimeException("Not applicable on this category");
        }

        // 7️⃣ Calculate discount
        BigDecimal discount = BigDecimal.ZERO;

        if (coupon.getFlatDiscount() != null) {
            discount = coupon.getFlatDiscount();
        }

        if (coupon.getDiscountPercent() != null) {
            discount = cartTotal
                    .multiply(coupon.getDiscountPercent())
                    .divide(BigDecimal.valueOf(100));
        }

        // 8️⃣ Max cap
        if (coupon.getMaxDiscountCap() != null &&
                discount.compareTo(coupon.getMaxDiscountCap()) > 0) {
            discount = coupon.getMaxDiscountCap();
        }

        return discount;
    }
}

