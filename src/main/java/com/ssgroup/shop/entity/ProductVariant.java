package com.ssgroup.shop.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "product_variants")
public class ProductVariant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false, unique = true)
    private String sku;

    @Column(nullable = false)
    private BigDecimal mrp;

    @Column(nullable = false)
    private BigDecimal price;

    private Integer stock;

    @Builder.Default
    private Boolean isActive = true;

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<VariantOption> options = new ArrayList<>();

    @OneToMany(mappedBy = "variant", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<PriceHistory> priceHistory = new ArrayList<>();
}
