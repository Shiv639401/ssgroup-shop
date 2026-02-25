package com.ssgroup.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssgroup.shop.entity.ProductVariant;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    // optional: findBySku(String sku)
}
