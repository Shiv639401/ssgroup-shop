package com.ssgroup.shop.dto.home;
import java.util.List;

import com.ssgroup.shop.dto.product.ProductResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class HomeDealsResponse {
    private List<DealCardDto> dealCards;     // Under499, BOGO, Flat30, Electronics, Sneakers
    private List<ProductResponse> hotDeals;
    private List<ProductResponse> under499;
    private List<ProductResponse> buyOneGetOne;
    private List<ProductResponse> flat30Off;
    private List<ProductResponse> trending;
    private List<BrandDto> topBrands;
}