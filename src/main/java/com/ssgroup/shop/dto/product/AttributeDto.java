package com.ssgroup.shop.dto.product;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttributeDto {
    private String name;   // e.g., "Material"
    private String value;  // e.g., "Cotton"
}
