package com.ssgroup.shop.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.service.BannerService;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

  private final BannerService banners;

  public BannerController(BannerService banners) {
    this.banners = banners;
  }

  @GetMapping
  public Object active() {
    return banners.activeBanners();
  }
}
