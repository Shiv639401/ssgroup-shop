package com.ssgroup.shop.spec;


import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.ssgroup.shop.entity.Product;

import jakarta.persistence.criteria.JoinType;

public class ProductSpecifications {

    public static Specification<Product> textSearch(String q) {
        return (root, query, cb) -> {
            if (q == null || q.isBlank()) return cb.conjunction();
            String like = "%" + q.trim().toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), like),
                    cb.like(cb.lower(root.get("description")), like)
            );
        };
    }

    public static Specification<Product> categorySlug(String slug) {
        return (root, query, cb) -> {
            if (slug == null || slug.isBlank()) return cb.conjunction();
            var cat = root.join("category", JoinType.INNER);
            return cb.equal(cat.get("slug"), slug);
        };
    }

    public static Specification<Product> brandId(Long brandId) {
        return (root, query, cb) -> {
            if (brandId == null) return cb.conjunction();
            var brand = root.join("brand", JoinType.LEFT);
            return cb.equal(brand.get("id"), brandId);
        };
    }

    public static Specification<Product> minPrice(BigDecimal min) {
        return (root, query, cb) -> {
            if (min == null) return cb.conjunction();
            // use minPrice column if exists, else root.get("price")
            return cb.greaterThanOrEqualTo(root.get("minPrice"), min);
        };
    }

    public static Specification<Product> maxPrice(BigDecimal max) {
        return (root, query, cb) -> {
            if (max == null) return cb.conjunction();
            return cb.lessThanOrEqualTo(root.get("minPrice"), max);
        };
    }

    public static Specification<Product> ratingAtLeast(Double rating) {
        return (root, query, cb) -> {
            if (rating == null) return cb.conjunction();
            return cb.greaterThanOrEqualTo(root.get("rating"), rating);
        };
    }

    public static Specification<Product> inStock(Boolean inStock) {
        return (root, query, cb) -> {
            if (inStock == null || !inStock) return cb.conjunction();
            return cb.greaterThan(root.get("stock"), 0);
        };
    }
}
