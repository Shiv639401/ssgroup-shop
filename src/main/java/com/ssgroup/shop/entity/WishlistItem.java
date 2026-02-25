

package com.ssgroup.shop.entity;

import java.time.Instant;

import jakarta.persistence.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="wishlist_items",
  uniqueConstraints = @UniqueConstraint(columnNames = {"user_id","product_id"}))
public class WishlistItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional=false)
  @JoinColumn(name="user_id")
  private User user;

  @ManyToOne(optional=false)
  @JoinColumn(name="product_id")
  private Product product;

  @Column(nullable=false)
  private Instant createdAt;
}
