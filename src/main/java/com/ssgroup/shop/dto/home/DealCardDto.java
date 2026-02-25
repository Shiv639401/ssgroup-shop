package com.ssgroup.shop.dto.home;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class DealCardDto {
    private String badge;     // HOT / DEAL / SALE / SAVE / NEW
    private String title;     // Under ₹499 etc
    private String subtitle;  // Top picks etc
    private String action;    // Tap to explore →
    private String route;     // /deals/under-499
}