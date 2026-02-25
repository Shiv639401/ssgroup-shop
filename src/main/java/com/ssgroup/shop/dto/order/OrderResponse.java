package com.ssgroup.shop.dto.order;


import lombok.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class OrderResponse {

  @Getter @Setter
  @NoArgsConstructor @AllArgsConstructor @Builder
  public static class Item {
    private Long productId;
    private String title;
    private String image;
    private Integer quantity;
    private BigDecimal unitPrice;
  }

  private Long id;
  private String status;
  private String paymentMode;
  private String appliedCoupon;

  private BigDecimal subtotal;
  private BigDecimal discount;
  private BigDecimal total;

  private Instant createdAt;
  private List<Item> items;
}
