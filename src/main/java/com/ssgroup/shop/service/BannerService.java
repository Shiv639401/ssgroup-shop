package com.ssgroup.shop.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssgroup.shop.dto.admin.BannerRequest;
import com.ssgroup.shop.entity.Banner;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.BannerRepository;

@Service
public class BannerService {

  private final BannerRepository banners;

  public BannerService(BannerRepository banners) {
    this.banners = banners;
  }

  public List<Banner> activeBanners() {
    return banners.findByActiveTrueOrderBySortOrderAsc();
  }

  public List<Banner> all() {
    return banners.findAll();
  }

  public Banner create(BannerRequest req) {
    Banner b = Banner.builder()
        .title(req.getTitle())
        .imageUrl(req.getImageUrl())
        .redirectUrl(req.getRedirectUrl())
        .active(req.getActive())
        .sortOrder(req.getSortOrder())
        .createdAt(Instant.now())
        .build();
    return banners.save(b);
  }

  public Banner update(Long id, BannerRequest req) {
    Banner b = banners.findById(id).orElseThrow(() -> new BadRequestException("Banner not found"));
    b.setTitle(req.getTitle());
    b.setImageUrl(req.getImageUrl());
    b.setRedirectUrl(req.getRedirectUrl());
    b.setActive(req.getActive());
    b.setSortOrder(req.getSortOrder());
    return banners.save(b);
  }

  public void delete(Long id) {
    banners.deleteById(id);
  }
}
