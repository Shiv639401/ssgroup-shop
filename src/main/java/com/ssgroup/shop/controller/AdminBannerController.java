package com.ssgroup.shop.controller;


import com.ssgroup.shop.dto.admin.BannerRequest;
import com.ssgroup.shop.service.BannerService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/banners")
public class AdminBannerController {

  private final BannerService banners;

  public AdminBannerController(BannerService banners) {
    this.banners = banners;
  }

  @GetMapping
  public Object all() { return banners.all(); }

  @PostMapping
  public Object create(@Valid @RequestBody BannerRequest req) {
    return banners.create(req);
  }

  @PutMapping("/{id}")
  public Object update(@PathVariable Long id, @Valid @RequestBody BannerRequest req) {
    return banners.update(id, req);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    banners.delete(id);
  }
}
