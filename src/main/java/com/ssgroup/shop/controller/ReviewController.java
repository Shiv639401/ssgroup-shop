package com.ssgroup.shop.controller;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssgroup.shop.dto.review.ReviewCreateRequest;
import com.ssgroup.shop.mapper.ReviewMapper;
import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

  private final ReviewService reviewService;
  private final UserRepository users;

  public ReviewController(ReviewService reviewService, UserRepository users) {
    this.reviewService = reviewService;
    this.users = users;
  }

  private Long uid(Authentication auth) {
    return users.findByEmail(auth.getName()).orElseThrow().getId();
  }

  @GetMapping("/product/{productId}")
  public Object list(@PathVariable Long productId) {
    return reviewService.listByProduct(productId).stream()
      .map(ReviewMapper::toResponse)
      .toList();
  }

  @PostMapping
  public Object add(Authentication auth, @Valid @RequestBody ReviewCreateRequest req) {
    var saved = reviewService.addOrUpdate(uid(auth), req);
    return ReviewMapper.toResponse(saved);
  }
}

