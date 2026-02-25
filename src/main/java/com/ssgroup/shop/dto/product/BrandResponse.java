package com.ssgroup.shop.dto.product;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BrandResponse {
    private Long id;
    private String name;
    private String slug;
    private String logoUrl;
}
