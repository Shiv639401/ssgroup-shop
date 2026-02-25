package com.ssgroup.shop.service;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ssgroup.shop.dto.home.DealRequest;
import com.ssgroup.shop.entity.Deal;
import com.ssgroup.shop.repository.DealRepository;

@Service
public class DealService {

    private final DealRepository repo;

    public DealService(DealRepository repo) {
        this.repo = repo;
    }

    public List<Deal> getAll() {
        return repo.findAll();
    }

    public Deal create(DealRequest req) {
        validate(req);

        if (repo.existsBySlug(req.slug.trim())) {
            throw new RuntimeException("Slug already exists: " + req.slug);
        }

        Deal d = new Deal();
        d.setTitle(req.title.trim());
        d.setSlug(req.slug.trim());
        d.setType(req.type.trim());
        d.setConfig(req.config); // keep as JSON string
        d.setActive(req.active != null ? req.active : true);

        return repo.save(d);
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Deal not found: " + id);
        }
        repo.deleteById(id);
    }

    public Deal toggleActive(Long id, boolean active) {
        Deal d = repo.findById(id).orElseThrow(() -> new RuntimeException("Deal not found: " + id));
        d.setActive(active);
        return repo.save(d);
    }

    private void validate(DealRequest req) {
        if (!StringUtils.hasText(req.title)) throw new RuntimeException("title is required");
        if (!StringUtils.hasText(req.slug)) throw new RuntimeException("slug is required");
        if (!StringUtils.hasText(req.type)) throw new RuntimeException("type is required");

        // optional: enforce known types
        String t = req.type.trim();
        if (!(t.equals("price-filter") || t.equals("category") || t.equals("custom"))) {
            throw new RuntimeException("Invalid type. Use price-filter | category | custom");
        }
    }
}