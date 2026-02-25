package com.ssgroup.shop.controller;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.dto.order.OrderDetailsDto;
import com.ssgroup.shop.dto.order.OrderSummaryDto;
import com.ssgroup.shop.dto.order.RevenueDto;
import com.ssgroup.shop.entity.Order;
import com.ssgroup.shop.service.AdminOrderService;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final AdminOrderService adminOrders;

    public AdminOrderController(AdminOrderService adminOrders) {
        this.adminOrders = adminOrders;
    }

    // LIST + FILTER + PAGINATION
    @GetMapping
    public Page<OrderSummaryDto> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String from,
            @RequestParam(required = false) String to,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return adminOrders.adminOrders(search, status, from, to, page, size);
    }

    // UPDATE STATUS
    @PutMapping("/{id}/status")
    public OrderSummaryDto updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Order updated = adminOrders.updateStatus(id, status);
        return adminOrders.toSummaryDto(updated);
    }

    // DETAILS
    @GetMapping("/{id}")
    public OrderDetailsDto details(@PathVariable Long id) {
        return adminOrders.adminOrderDetails(id);
    }

    // REVENUE
    @GetMapping("/revenue")
    public RevenueDto revenue(@RequestParam(defaultValue = "TODAY") String filter) {
        return adminOrders.revenue(filter);
    }
}