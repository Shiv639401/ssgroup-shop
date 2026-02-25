package com.ssgroup.shop.entity;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@Entity
@Table(name="orders")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(optional=false)
  @JoinColumn(name="user_id")
  private User user;

  private String shippingName;
  private String shippingPhone;

  @Column(length=1000)
  private String shippingAddress;

  private String shippingPincode;
  private String shippingCity;
  private String shippingState;

  private BigDecimal shippingCharge;

  @Enumerated(EnumType.STRING)
  private OrderStatus status;

  private String paymentMode; // COD / ONLINE
  private String paymentStatus; // PENDING / PAID / FAILED

  private BigDecimal subtotal;
  private BigDecimal discount;
  
  private BigDecimal total;

  private String appliedCoupon;
  private String trackingNumber;

  private Instant estimatedDeliveryDate;
  private Instant createdAt;
  @Column
  private String paymentOrderId;

  @Column
  private String paymentId;

  @Column
  private String signature;

  @Column
  private boolean paymentVerified;


  @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval=true)
  @Builder.Default
  private List<OrderItem> items = new ArrayList<>();
}
