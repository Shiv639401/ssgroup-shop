package com.ssgroup.shop.dto.order;



import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PlaceOrderRequest {
  @NotBlank
  private String shippingName;

  @NotBlank
  private String shippingPhone;

  @NotBlank
  private String shippingAddress;

  @NotBlank
  private String paymentMode; // COD / ONLINE_MOCK

  private String couponCode; // optional
}
