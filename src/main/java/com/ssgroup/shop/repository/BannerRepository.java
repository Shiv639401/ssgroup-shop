package com.ssgroup.shop.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.Banner;

public interface BannerRepository extends JpaRepository<Banner, Long> {
  List<Banner> findByActiveTrueOrderBySortOrderAsc();
}
