package com.ssgroup.shop.dto.order;

import com.ssgroup.shop.entity.OrderStatus;
import java.time.LocalDateTime;

public record OrderSummaryDto(
        Long id,
        LocalDateTime createdAt,
        int itemsCount,
        double total,
        OrderStatus status,
        String trackingNumber
) {}