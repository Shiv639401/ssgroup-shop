package com.ssgroup.shop.dto.product;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantResponse {

    private Long id;
    private String sku;

    private BigDecimal mrp;
    private BigDecimal price;
    private Integer stock;
    private Boolean isActive;

    private List<VariantOptionDto> options;
    private List<PriceHistoryDto> priceHistory; // optional, good for admin
}
