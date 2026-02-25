package com.ssgroup.shop.dto.product;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantOptionDto {
    private String name;   // e.g., "Color"
    private String value;  // e.g., "Red"
}
