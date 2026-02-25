package com.ssgroup.shop.mapper;



import com.ssgroup.shop.dto.cart.CartResponse;
import com.ssgroup.shop.entity.CartItem;

import java.math.BigDecimal;
import java.util.List;

public class CartMapper {

  public static CartResponse toResponse(List<CartItem> items) {
    var mapped = items.stream().map(ci -> CartResponse.Item.builder()
      .productId(ci.getProduct().getId())
      .title(ci.getProduct().getTitle())
      .image(ci.getProduct().getImages().isEmpty() ? "" : ci.getProduct().getImages().get(0).getUrl())
      .price(ci.getProduct().getPrice())
      .mrp(ci.getProduct().getMrp())
      .quantity(ci.getQuantity())
      .stock(ci.getProduct().getStock())
      .build()).toList();

    BigDecimal subtotal = mapped.stream()
      .map(i -> i.getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    BigDecimal mrpTotal = mapped.stream()
      .map(i -> i.getMrp().multiply(BigDecimal.valueOf(i.getQuantity())))
      .reduce(BigDecimal.ZERO, BigDecimal::add);

    return CartResponse.builder()
      .items(mapped)
      .subtotal(subtotal)
      .mrpTotal(mrpTotal)
      .build();
  }
}
