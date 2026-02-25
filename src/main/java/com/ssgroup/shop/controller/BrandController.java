package com.ssgroup.shop.controller;


import com.ssgroup.shop.entity.Brand;
import com.ssgroup.shop.repository.BrandRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brands;

    // ============================
    // GET ALL BRANDS
    // ============================
    @GetMapping
    public List<Brand> getAll() {
        return brands.findAll();
    }

    // ============================
    // CREATE BRAND (ADMIN)
    // ============================
    @PostMapping
    public Brand create(@RequestBody Brand brand) {
        brand.setCreatedAt(LocalDateTime.now());
        return brands.save(brand);
    }

    // ============================
    // UPDATE BRAND (ADMIN)
    // ============================
    @PutMapping("/{id}")
    public Brand update(@PathVariable Long id,
                        @RequestBody Brand updated) {

        Brand existing = brands.findById(id)
                .orElseThrow(() -> new RuntimeException("Brand not found"));

        existing.setName(updated.getName());
        existing.setSlug(updated.getSlug());
        existing.setLogoUrl(updated.getLogoUrl());

        return brands.save(existing);
    }

    // ============================
    // DELETE BRAND (ADMIN)
    // ============================
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        brands.deleteById(id);
    }
}
