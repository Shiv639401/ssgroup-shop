package com.ssgroup.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssgroup.shop.entity.ProductAttribute;

public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Long> {
}
