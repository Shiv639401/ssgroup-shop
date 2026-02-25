package com.ssgroup.shop.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import com.ssgroup.shop.entity.Order;
import com.ssgroup.shop.entity.OrderStatus;

public interface OrderRepository extends
        JpaRepository<Order, Long>,
        JpaSpecificationExecutor<Order>
{

    // USER ORDERS
    List<Order> findByUser_IdOrderByCreatedAtDesc(Long userId);

    Optional<Order> findByPaymentOrderId(String paymentOrderId);

    // VERIFIED PURCHASE CHECK
    @Query("""
        select (count(oi) > 0)
        from Order o
        join o.items oi
        where o.user.id = :userId
          and oi.product.id = :productId
          and o.status = com.ssgroup.shop.entity.OrderStatus.DELIVERED
    """)
    boolean hasDeliveredPurchase(@Param("userId") Long userId,
                                 @Param("productId") Long productId);

    // Total Revenue (All Time)
    @Query("""
        select coalesce(sum(o.total), 0)
        from Order o
        where o.status <> com.ssgroup.shop.entity.OrderStatus.CANCELLED
    """)
    double getTotalRevenue();

    // Revenue Between Dates (Instant)
    @Query("""
        select coalesce(sum(o.total), 0)
        from Order o
        where o.createdAt between :start and :end
          and o.status <> com.ssgroup.shop.entity.OrderStatus.CANCELLED
    """)
    double getRevenueBetween(@Param("start") Instant start,
                             @Param("end") Instant end);

    // Revenue By Status
    @Query("""
        select coalesce(sum(o.total), 0)
        from Order o
        where o.status = :status
    """)
    double getRevenueByStatus(@Param("status") OrderStatus status);
}