package com.ssgroup.shop.repository;



import com.ssgroup.shop.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {}

