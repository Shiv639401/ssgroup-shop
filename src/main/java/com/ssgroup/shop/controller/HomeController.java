package com.ssgroup.shop.controller;
import java.math.BigDecimal;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.mapper.ProductMapper;
import com.ssgroup.shop.repository.BrandRepository;
import com.ssgroup.shop.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/home")
@RequiredArgsConstructor
public class HomeController {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    @GetMapping
    public Map<String, Object> home() {

        var trending = productRepository.findTrending(PageRequest.of(0, 10));
        var under499 = productRepository.findByPriceLessThanEqual(new BigDecimal("499"));
        var flat30 = productRepository.findByDiscountPercentGreaterThanEqual(30);
        var brands = brandRepository.findTop12ByOrderByIdDesc();

        return Map.of(
            "trending", trending.stream().map(ProductMapper::toResponse).toList(),
            "under499", under499.stream().limit(10).map(ProductMapper::toResponse).toList(),
            "flat30", flat30.stream().limit(10).map(ProductMapper::toResponse).toList(),
            "brands", brands
        );
    }
}