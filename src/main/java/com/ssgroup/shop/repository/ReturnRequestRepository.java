package com.ssgroup.shop.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssgroup.shop.entity.ReturnRequest;

public interface ReturnRequestRepository extends JpaRepository<ReturnRequest, Long> {
  List<ReturnRequest> findByOrder_Id(Long orderId);
}
