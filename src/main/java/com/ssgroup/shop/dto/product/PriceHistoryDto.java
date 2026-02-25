package com.ssgroup.shop.dto.product;

import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceHistoryDto {
    private BigDecimal mrp;
    private BigDecimal price;
    private LocalDateTime changedAt;
}
