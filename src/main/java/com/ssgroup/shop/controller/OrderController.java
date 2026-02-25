package com.ssgroup.shop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ssgroup.shop.dto.order.PlaceOrderRequest;
import com.ssgroup.shop.mapper.OrderMapper;
import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.service.OrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orders;
    private final UserRepository users;

    public OrderController(OrderService orders, UserRepository users) {
        this.orders = orders;
        this.users = users;
    }

    private Long uid(Authentication auth) {
        return users.findByEmail(auth.getName())
                .orElseThrow()
                .getId();
    }

    // =======================
    // GET MY ORDERS
    // =======================
    @GetMapping
    public ResponseEntity<?> my(Authentication auth) {
        var list = orders.myOrders(uid(auth))
                .stream()
                .map(OrderMapper::toResponse)
                .toList();

        return ResponseEntity.ok(list);
    }

    // =======================
    // PLACE ORDER
    // =======================
    @PostMapping
    public ResponseEntity<?> place(
            Authentication auth,
            @Valid @RequestBody PlaceOrderRequest req
    ) {

        var order = orders.placeOrder(
                uid(auth),
                req.getShippingName(),
                req.getShippingPhone(),
                req.getShippingAddress(),
                req.getPaymentMode(),
                req.getCouponCode()
        );

        return ResponseEntity.ok(OrderMapper.toResponse(order));
    }

    // =======================
    // CANCEL ORDER
    // =======================
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(
            Authentication auth,
            @PathVariable Long id
    ) {

        var updated = orders.cancelOrder(uid(auth), id);
        return ResponseEntity.ok(OrderMapper.toResponse(updated));
    }

    // =======================
    // RETURN REQUEST
    // =======================
    @PutMapping("/{id}/return")
    public ResponseEntity<?> requestReturn(
            Authentication auth,
            @PathVariable Long id
    ) {

        var updated = orders.requestReturn(uid(auth), id);
        return ResponseEntity.ok(OrderMapper.toResponse(updated));
    }

    // =======================
    // REPLACEMENT REQUEST
    // =======================
    @PutMapping("/{id}/replace")
    public ResponseEntity<?> requestReplace(
            Authentication auth,
            @PathVariable Long id
    ) {

        var updated = orders.requestReplacement(uid(auth), id);
        return ResponseEntity.ok(OrderMapper.toResponse(updated));
    }
}