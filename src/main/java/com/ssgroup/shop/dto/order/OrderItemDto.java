package com.ssgroup.shop.dto.order;

public record OrderItemDto(
        Long productId,
        String productName,
        int quantity,
        double price
) {}