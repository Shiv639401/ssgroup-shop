package com.ssgroup.shop.controller;


import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.dto.home.DealRequest;
import com.ssgroup.shop.entity.Deal;
import com.ssgroup.shop.service.DealService;

@RestController
@RequestMapping("/api/admin/deals")
@CrossOrigin(origins = "http://localhost:5173") // Vite
public class AdminDealController {

    private final DealService service;

    public AdminDealController(DealService service) {
        this.service = service;
    }

    @GetMapping
    public List<Deal> getAllDeals() {
        return service.getAll();
    }

    @PostMapping
    public Deal createDeal(@RequestBody DealRequest req) {
        return service.create(req);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeal(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    // optional: activate/deactivate
    @PatchMapping("/{id}/active")
    public Deal setActive(@PathVariable Long id, @RequestParam boolean value) {
        return service.toggleActive(id, value);
    }
}