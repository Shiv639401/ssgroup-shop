package com.ssgroup.shop.dto.cart;


import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AddToCartRequest {
  @NotNull
  private Long productId;

  @NotNull @Min(1) @Max(10)
  private Integer quantity;
}

