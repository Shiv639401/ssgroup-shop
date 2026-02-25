package com.ssgroup.shop.dto.order;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminOrderDTO {

    private Long id;
    private String customerName;
    private String email;
    private String status;
    private Double totalAmount;
    private String trackingNumber;
    private LocalDateTime createdAt;
}