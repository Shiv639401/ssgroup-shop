package com.ssgroup.shop.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "deals")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String title;

    @Column(nullable=false, unique=true)
    private String slug;

    @Column(nullable=false)
    private String type; // "price-filter" | "category" | "custom"

    @Column(columnDefinition = "TEXT")
    private String config;

    @Builder.Default
    @Column(nullable=false)
    private boolean active = true;   // 🔥 changed to primitive

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}