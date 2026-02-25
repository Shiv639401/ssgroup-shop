package com.ssgroup.shop.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
	List<Brand> findTop12ByOrderByIdDesc();
	}
