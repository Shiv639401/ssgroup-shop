package com.ssgroup.shop.service;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.repository.ProductRepository;
import com.ssgroup.shop.spec.ProductSpecifications;
import com.ssgroup.shop.spec.ProductVariantSpecifications;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductSearchService {

    private final ProductRepository products;

    @Transactional(readOnly = true)
    public Page<Product> search(
            String q,
            String categorySlug,
            Long brandId,

            // product level
            Double ratingMin,

            // variant level
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean inStock,
            String color,
            String size,

            int page,
            int sizeLimit,
            String sort
    ) {

        Specification<Product> spec =
                Specification.where(ProductSpecifications.textSearch(q))
                        .and(ProductSpecifications.categorySlug(categorySlug))
                        .and(ProductSpecifications.brandId(brandId))
                        .and(ProductSpecifications.ratingAtLeast(ratingMin))

                        // 🔥 Variant based filters
                        .and(ProductVariantSpecifications.variantPriceBetween(minPrice, maxPrice))
                        .and(ProductVariantSpecifications.variantInStock(inStock))
                        .and(ProductVariantSpecifications.variantOptionEquals("color", color))
                        .and(ProductVariantSpecifications.variantOptionEquals("size", size));

        // ===============================
        // Sorting
        // ===============================
        Sort s = switch (sort == null ? "" : sort) {

            case "price_asc" -> Sort.by("price").ascending();   // min aggregated price
            case "price_desc" -> Sort.by("price").descending();
            case "rating_desc" -> Sort.by("rating").descending();
            case "newest" -> Sort.by("createdAt").descending();

            default -> Sort.by("createdAt").descending();
        };

        Pageable pageable = PageRequest.of(page, sizeLimit, s);

        Page<Product> result = products.findAll(spec, pageable);

        // ===============================
        // Lazy loading prevention
        // ===============================
        result.getContent().forEach(p -> {
            p.getImages().size();
            p.getVariants().size();
            p.getAttributes().size();
            if (p.getBrand() != null) {
                p.getBrand().getName();
            }
        });

        return result;
    }
}
