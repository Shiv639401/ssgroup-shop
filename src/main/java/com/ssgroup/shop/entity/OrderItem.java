

package com.ssgroup.shop.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="order_items")
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional=false)
  @JoinColumn(name="order_id")
  private Order order;

  @ManyToOne(optional=false)
  @JoinColumn(name="product_id")
  private Product product;

  @Column(nullable=false)
  private Integer quantity;

  @Column(nullable=false)
  private BigDecimal unitPrice;
}
