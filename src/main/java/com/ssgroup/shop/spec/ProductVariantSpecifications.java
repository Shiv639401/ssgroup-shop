package com.ssgroup.shop.spec;


import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.ssgroup.shop.entity.Product;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;

public class ProductVariantSpecifications {

    private ProductVariantSpecifications() {}

    // ✅ Variant In Stock
    public static Specification<Product> variantInStock(Boolean inStock) {
        return (root, query, cb) -> {
            if (inStock == null || !inStock) return cb.conjunction();

            query.distinct(true);
            Join<Object, Object> v = root.join("variants", JoinType.INNER);

            return cb.greaterThan(v.get("stock"), 0);
        };
    }

    // ✅ Variant price range filter
    public static Specification<Product> variantPriceBetween(BigDecimal minPrice, BigDecimal maxPrice) {
        return (root, query, cb) -> {
            if (minPrice == null && maxPrice == null) return cb.conjunction();

            query.distinct(true);
            Join<Object, Object> v = root.join("variants", JoinType.INNER);

            Predicate p = cb.conjunction();
            if (minPrice != null) p = cb.and(p, cb.greaterThanOrEqualTo(v.get("price"), minPrice));
            if (maxPrice != null) p = cb.and(p, cb.lessThanOrEqualTo(v.get("price"), maxPrice));

            // only active variants
            p = cb.and(p, cb.isTrue(v.get("isActive")));

            return p;
        };
    }

    // ✅ Option filter: name=value (Color=Red, Size=M)
    public static Specification<Product> variantOptionEquals(String optionName, String optionValue) {
        return (root, query, cb) -> {
            if (optionName == null || optionName.isBlank()) return cb.conjunction();
            if (optionValue == null || optionValue.isBlank()) return cb.conjunction();

            query.distinct(true);
            Join<Object, Object> v = root.join("variants", JoinType.INNER);
            Join<Object, Object> opt = v.join("options", JoinType.INNER);

            Predicate active = cb.isTrue(v.get("isActive"));

            Predicate matchName = cb.equal(cb.lower(opt.get("name")), optionName.trim().toLowerCase());
            Predicate matchValue = cb.equal(cb.lower(opt.get("value")), optionValue.trim().toLowerCase());

            return cb.and(active, matchName, matchValue);
        };
    }
}
