package com.ssgroup.shop.dto.admin;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReturnRequestCreateRequest {
  @NotNull
  private Long orderId;

  @NotBlank
  private String reason;
}
