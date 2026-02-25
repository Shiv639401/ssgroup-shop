package com.ssgroup.shop.dto.product;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductResponse {

    private Long id;

    private String title;
    private String description;

    private BigDecimal price;
    private BigDecimal mrp;
    private Integer stock;
    private Double rating;

    private Instant createdAt;

    // 🔹 CATEGORY
    private Long categoryId;
    private String categoryName;
    private String categorySlug;

    // 🔥 BRAND (NEW)
    private BrandResponse brand;

    // 🔥 VARIANTS (NEW)
    private List<VariantResponse> variants;

    // 🔥 ATTRIBUTES (NEW)
    private List<AttributeDto> attributes;

    // 🔹 IMAGES (already)
    private List<String> images;

    // 🔥 DEFAULT VARIANT (optional but powerful for listing page)
    private VariantResponse defaultVariant;
}
