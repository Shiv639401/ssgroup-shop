package com.ssgroup.shop.dto.order;

import com.ssgroup.shop.entity.OrderStatus;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDetailsDto(
        Long id,
        LocalDateTime createdAt,
        String customerName,
        String customerEmail,
        String address,
        String paymentMethod,
        List<OrderItemDto> items,
        double total,
        String trackingNumber,
        OrderStatus status
) {}