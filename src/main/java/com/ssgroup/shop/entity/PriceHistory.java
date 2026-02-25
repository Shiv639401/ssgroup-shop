package com.ssgroup.shop.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "price_history")
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;

    @Column(nullable = false)
    private BigDecimal mrp;

    @Column(nullable = false)
    private BigDecimal price;

    private LocalDateTime changedAt;

    @PrePersist
    public void prePersist() {
        this.changedAt = LocalDateTime.now();
    }
}
