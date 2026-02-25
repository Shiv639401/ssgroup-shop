package com.ssgroup.shop.mapper;


import com.ssgroup.shop.dto.order.OrderResponse;
import com.ssgroup.shop.entity.Order;

public class OrderMapper {
  public static OrderResponse toResponse(Order o) {
    return OrderResponse.builder()
      .id(o.getId())
      .status(o.getStatus().name())
      .paymentMode(o.getPaymentMode())
      .appliedCoupon(o.getAppliedCoupon())
      .subtotal(o.getSubtotal())
      .discount(o.getDiscount())
      .total(o.getTotal())
      .createdAt(o.getCreatedAt())
      .items(o.getItems().stream().map(oi -> OrderResponse.Item.builder()
        .productId(oi.getProduct().getId())
        .title(oi.getProduct().getTitle())
        .image(oi.getProduct().getImages().isEmpty() ? "" : oi.getProduct().getImages().get(0).getUrl())
        .quantity(oi.getQuantity())
        .unitPrice(oi.getUnitPrice())
        .build()).toList())
      .build();
  }
}
