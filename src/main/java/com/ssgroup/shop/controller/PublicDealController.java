package com.ssgroup.shop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.entity.Deal;
import com.ssgroup.shop.service.DealService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/deals")
@RequiredArgsConstructor
public class PublicDealController {

    private final DealService service;

    @GetMapping
    public List<Deal> getActiveDeals() {
        return service.getAll()
                .stream()
                .filter(Deal::isActive)
                .toList();
    }
}