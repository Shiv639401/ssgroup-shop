package com.ssgroup.shop.dto.product;


import lombok.*;
import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantRequest {

    private String sku;             // unique
    private BigDecimal mrp;
    private BigDecimal price;
    private Integer stock;
    private Boolean isActive;

    private List<VariantOptionDto> options;  // e.g. Color, Size etc.
}
