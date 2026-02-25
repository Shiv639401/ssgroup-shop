package com.ssgroup.shop.dto.admin;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UpdateOrderStatusRequest {
  @NotBlank
  private String status; // CREATED/PAID/PACKED/SHIPPED/DELIVERED/CANCELLED/REFUNDED
}
