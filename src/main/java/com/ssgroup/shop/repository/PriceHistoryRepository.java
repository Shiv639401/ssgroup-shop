package com.ssgroup.shop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssgroup.shop.entity.PriceHistory;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
}
