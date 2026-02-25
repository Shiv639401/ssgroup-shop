package com.ssgroup.shop.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // CATEGORY
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // BRAND
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id")
    private Brand brand;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private BigDecimal mrp;

    @Column(nullable = false)
    private Integer stock;

    @Column(nullable = false)
    @Builder.Default
    private Double rating = 0.0;

    @Builder.Default
    private Double ratingAvg = 0.0;

    @Builder.Default
    private Integer ratingCount = 0;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    // ============================
    // 🔥 DEAL ENGINE
    // ============================

    @Column(nullable = false)
    @Builder.Default
    private Boolean hotDeal = false;

    @Column(nullable = false)
    @Builder.Default
    private Boolean buyOneGetOne = false;

    @Column(nullable = false)
    @Builder.Default
    private Integer discountPercent = 0;

    @Column
    private Instant dealStart;

    @Column
    private Instant dealEnd;

    // ============================
    // 📈 ANALYTICS
    // ============================

    @Column(nullable = false)
    @Builder.Default
    private Integer totalSold = 0;

    @Column(nullable = false)
    @Builder.Default
    private Integer viewCount = 0;

    @Column(nullable = false)
    @Builder.Default
    private Boolean featured = false;

    // ============================
    // RELATIONS
    // ============================

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductVariant> variants = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductAttribute> attributes = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<ProductImage> images = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        this.createdAt = Instant.now();
    }
}