package com.ssgroup.shop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name="banners")
public class Banner {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable=false)
  private String title;

  @Column(nullable=false, length=2000)
  private String imageUrl;

  @Column(nullable=true, length=2000)
  private String redirectUrl;

  @Column(nullable=false)
  private Boolean active;

  @Column(nullable=false)
  private Integer sortOrder;

  @Column(nullable=false)
  private Instant createdAt;
}
