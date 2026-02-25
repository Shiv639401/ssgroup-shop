

package com.ssgroup.shop.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true)
    private String code;

    private boolean active;

    private BigDecimal discountPercent;
    private BigDecimal flatDiscount;

    private BigDecimal minCartValue;

    private BigDecimal maxDiscountCap;

    private LocalDateTime expiresAt;

    private Integer usageLimit;          // total usage allowed
    private Integer usedCount;

    private boolean firstTimeUserOnly;

    // category specific
    @ManyToOne
    private Category applicableCategory;
}
