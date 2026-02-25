package com.ssgroup.shop.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity @Table(name="carts")
public class Cart {
  @Id
  private Long userId;

  @OneToOne(optional=false)
  @MapsId
  @JoinColumn(name="user_id")
  private User user;
}
