package com.ssgroup.shop.dto.cart;


import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CartResponse {

  @Getter @Setter
  @NoArgsConstructor @AllArgsConstructor @Builder
  public static class Item {
    private Long productId;
    private String title;
    private String image;
    private BigDecimal price;
    private BigDecimal mrp;
    private Integer quantity;
    private Integer stock;
  }

  private List<Item> items;
  private BigDecimal subtotal;
  private BigDecimal mrpTotal;
}
