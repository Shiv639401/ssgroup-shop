package com.ssgroup.shop.service;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ssgroup.shop.dto.home.BrandDto;
import com.ssgroup.shop.dto.home.DealCardDto;
import com.ssgroup.shop.dto.home.HomeDealsResponse;
import com.ssgroup.shop.entity.Brand;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.mapper.ProductMapper;
import com.ssgroup.shop.repository.BrandRepository;
import com.ssgroup.shop.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class HomeService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;

    public HomeDealsResponse getHome() {

        Instant now = Instant.now();

        List<Product> under499 = productRepository.findByPriceLessThanEqual(new BigDecimal("499"));
        List<Product> hotDeals = productRepository.findByHotDealTrueAndDealEndAfter(now);
        List<Product> bogo = productRepository.findByBuyOneGetOneTrue();
        List<Product> flat30 = productRepository.findByDiscountPercentGreaterThanEqual(30);
        List<Product> trending = productRepository.findTrending(PageRequest.of(0, 10));
        List<Brand> brands = brandRepository.findTop12ByOrderByIdDesc();

        // ✅ deal cards (UI top row)
        List<DealCardDto> dealCards = List.of(
            DealCardDto.builder().badge("HOT").title("Under ₹499").subtitle("Top picks").action("Tap to explore →").route("/deals/under-499").build(),
            DealCardDto.builder().badge("DEAL").title("Buy 1 Get 1").subtitle("Limited time").action("Tap to explore →").route("/deals/bogo").build(),
            DealCardDto.builder().badge("SALE").title("Flat 30% Off").subtitle("New arrivals").action("Tap to explore →").route("/deals/flat-30").build(),
            DealCardDto.builder().badge("SAVE").title("Electronics").subtitle("Best prices").action("Tap to explore →").route("/category/electronics").build(),
            DealCardDto.builder().badge("NEW").title("Sneakers").subtitle("Trending").action("Tap to explore →").route("/category/sneakers").build()
        );

        return HomeDealsResponse.builder()
            .dealCards(dealCards)
            .under499(under499.stream().limit(10).map(ProductMapper::toResponse).toList())
            .hotDeals(hotDeals.stream().limit(10).map(ProductMapper::toResponse).toList())
            .buyOneGetOne(bogo.stream().limit(10).map(ProductMapper::toResponse).toList())
            .flat30Off(flat30.stream().limit(10).map(ProductMapper::toResponse).toList())
            .trending(trending.stream().map(ProductMapper::toResponse).toList())
            .topBrands(brands.stream().map(b -> BrandDto.builder().id(b.getId()).name(b.getName()).logoUrl(b.getLogoUrl()).build()).toList())
            .build();
    }
}