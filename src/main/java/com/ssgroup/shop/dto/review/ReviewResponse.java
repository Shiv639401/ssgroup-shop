package com.ssgroup.shop.dto.review;


import java.time.Instant;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ReviewResponse {
  private Long id;
  private Long productId;
  private Integer rating;
  private String comment;
  private Boolean verifiedPurchase;
  private String userName;
  private Instant createdAt;
}
