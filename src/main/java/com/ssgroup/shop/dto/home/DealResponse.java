package com.ssgroup.shop.dto.home;


import java.time.LocalDateTime;

public class DealResponse {
    public Long id;
    public String title;
    public String slug;
    public String type;
    public String config;
    public Boolean active;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
}