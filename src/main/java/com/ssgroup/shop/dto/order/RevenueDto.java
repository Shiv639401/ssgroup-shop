package com.ssgroup.shop.dto.order;

public record RevenueDto(
        double todayRevenue,
        double monthRevenue,
        double totalRevenue
) {}