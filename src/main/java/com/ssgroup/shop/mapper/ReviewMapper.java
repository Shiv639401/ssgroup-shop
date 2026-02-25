package com.ssgroup.shop.mapper;



import com.ssgroup.shop.dto.review.ReviewResponse;
import com.ssgroup.shop.entity.Review;

public class ReviewMapper {
  public static ReviewResponse toResponse(Review r) {
    return ReviewResponse.builder()
      .id(r.getId())
      .productId(r.getProduct().getId())
      .rating(r.getRating())
      .comment(r.getComment())
      .verifiedPurchase(r.getVerifiedPurchase())
      .userName(r.getUser().getFullName())
      .createdAt(r.getCreatedAt())
      .build();
  }
}
