package com.ssgroup.shop.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name="return_requests")
public class ReturnRequest {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional=false)
  @JoinColumn(name="order_id")
  private Order order;

  @Column(nullable=false, length=500)
  private String reason;

  @Column(nullable=false)
  private String status; // REQUESTED / APPROVED / REJECTED / REFUNDED

  @Column(nullable=false)
  private Instant createdAt;
}
