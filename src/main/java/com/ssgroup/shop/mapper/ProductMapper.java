package com.ssgroup.shop.mapper;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import com.ssgroup.shop.dto.product.AttributeDto;
import com.ssgroup.shop.dto.product.BrandResponse;
import com.ssgroup.shop.dto.product.PriceHistoryDto;
import com.ssgroup.shop.dto.product.ProductResponse;
import com.ssgroup.shop.dto.product.VariantOptionDto;
import com.ssgroup.shop.dto.product.VariantResponse;
import com.ssgroup.shop.entity.PriceHistory;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.ProductImage;

public class ProductMapper {

    private ProductMapper() {}

    public static ProductResponse toResponse(Product p) {

        if (p == null) return null;

        // --------------------------
        // IMAGES (sorted)
        // --------------------------
        List<String> images = p.getImages() != null
                ? p.getImages().stream()
                    .sorted(Comparator.comparing(ProductImage::getSortOrder))
                    .map(ProductImage::getUrl)
                    .collect(Collectors.toList())
                : Collections.emptyList();

        // --------------------------
        // BRAND
        // --------------------------
        BrandResponse brand = null;
        if (p.getBrand() != null) {
            brand = BrandResponse.builder()
                    .id(p.getBrand().getId())
                    .name(p.getBrand().getName())
                    .slug(p.getBrand().getSlug())
                    .logoUrl(p.getBrand().getLogoUrl())
                    .build();
        }

        // --------------------------
        // ATTRIBUTES
        // --------------------------
        List<AttributeDto> attributes = p.getAttributes() != null
                ? p.getAttributes().stream()
                    .map(a -> AttributeDto.builder()
                            .name(a.getName())
                            .value(a.getValue())
                            .build())
                    .collect(Collectors.toList())
                : Collections.emptyList();

        // --------------------------
        // VARIANTS + OPTIONS + PRICE HISTORY
        // --------------------------
        List<VariantResponse> variants = p.getVariants() != null
                ? p.getVariants().stream()
                    .map(v -> {

                        List<VariantOptionDto> options =
                                v.getOptions() != null
                                        ? v.getOptions().stream()
                                            .map(o -> VariantOptionDto.builder()
                                                    .name(o.getName())
                                                    .value(o.getValue())
                                                    .build())
                                            .collect(Collectors.toList())
                                        : Collections.emptyList();

                        List<PriceHistoryDto> priceHistory =
                                v.getPriceHistory() != null
                                        ? v.getPriceHistory().stream()
                                            .sorted(Comparator.comparing(PriceHistory::getChangedAt).reversed())
                                            .map(ph -> PriceHistoryDto.builder()
                                                    .mrp(ph.getMrp())
                                                    .price(ph.getPrice())
                                                    .changedAt(ph.getChangedAt())
                                                    .build())
                                            .collect(Collectors.toList())
                                        : Collections.emptyList();

                        return VariantResponse.builder()
                                .id(v.getId())
                                .sku(v.getSku())
                                .mrp(v.getMrp())
                                .price(v.getPrice())
                                .stock(v.getStock())
                                .isActive(v.getIsActive())
                                .options(options)
                                .priceHistory(priceHistory)
                                .build();
                    })
                    .collect(Collectors.toList())
                : Collections.emptyList();

        // --------------------------
        // DEFAULT VARIANT (lowest active price)
        // --------------------------
        VariantResponse defaultVariant = variants.stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .min(Comparator.comparing(VariantResponse::getPrice))
                .orElse(null);

        // --------------------------
        // LISTING PRICE (min variant price if exists)
        // --------------------------
        BigDecimal listingPrice = variants.stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .map(VariantResponse::getPrice)
                .filter(Objects::nonNull)
                .min(BigDecimal::compareTo)
                .orElse(p.getPrice());

        BigDecimal listingMrp = variants.stream()
                .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                .map(VariantResponse::getMrp)
                .filter(Objects::nonNull)
                .min(BigDecimal::compareTo)
                .orElse(p.getMrp());

        // --------------------------
        // FINAL RESPONSE
        // --------------------------
        return ProductResponse.builder()
                .id(p.getId())
                .title(p.getTitle())
                .description(p.getDescription())
                .price(listingPrice)     // 🔥 min variant price
                .mrp(listingMrp)
                .stock(p.getStock())
                .rating(p.getRating())
                .createdAt(p.getCreatedAt())

                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .categorySlug(p.getCategory() != null ? p.getCategory().getSlug() : null)

                .brand(brand)
                .variants(variants)
                .attributes(attributes)
                .images(images)
                .defaultVariant(defaultVariant)

                .build();
    }
}
