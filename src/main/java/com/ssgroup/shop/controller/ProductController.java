package com.ssgroup.shop.controller;

import java.math.BigDecimal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.ssgroup.shop.dto.common.PageResponse;
import com.ssgroup.shop.dto.product.ProductCreateRequest;
import com.ssgroup.shop.dto.product.ProductResponse;
import com.ssgroup.shop.dto.product.ProductUpdateRequest;
import com.ssgroup.shop.dto.search.SuggestionResponse;
import com.ssgroup.shop.mapper.ProductMapper;
import com.ssgroup.shop.security.S3Service;
import com.ssgroup.shop.service.ProductSearchService;
import com.ssgroup.shop.service.ProductService;
import com.ssgroup.shop.service.SearchSuggestionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    private final ProductService products;
    private final ProductSearchService productSearchService;
    private final SearchSuggestionService suggestionService;
    private final S3Service s3Service;

    public ProductController(ProductService products,
                             ProductSearchService productSearchService,
                             SearchSuggestionService suggestionService,
                             S3Service s3Service) {
        this.products = products;
        this.productSearchService = productSearchService;
        this.suggestionService = suggestionService;
        this.s3Service = s3Service;
    }

    // ==================================================
    // BASIC LISTING API
    // ==================================================
    @GetMapping
    public ResponseEntity<PageResponse<ProductResponse>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort
    ) {

        var result = products.search(q, category, page, size, sort);
        return ResponseEntity.ok(buildPageResponse(result));
    }

    // ==================================================
    // 🔥 ADVANCED SEARCH (Phase 2)
    // ==================================================
    @GetMapping("/search")
    public ResponseEntity<PageResponse<ProductResponse>> advancedSearch(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) Double ratingMin,

            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String sizeFilter,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "newest") String sort
    ) {

        var result = productSearchService.search(
                q,
                category,
                brandId,
                ratingMin,
                minPrice,
                maxPrice,
                inStock,
                color,
                sizeFilter,
                page,
                size,
                sort
        );

        return ResponseEntity.ok(buildPageResponse(result));
    }

    // ==================================================
    // 🔎 PHASE 3 — SEARCH SUGGESTIONS
    // ==================================================
    @GetMapping("/suggestions")
    public ResponseEntity<SuggestionResponse> suggestions(
            @RequestParam String q,
            @RequestParam(defaultValue = "8") int limit
    ) {

        var list = suggestionService.suggest(q, limit);

        return ResponseEntity.ok(
                SuggestionResponse.builder()
                        .query(q)
                        .suggestions(list)
                        .build()
        );
    }

    // ==================================================
    // PRODUCT DETAILS
    // ==================================================
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> details(@PathVariable Long id) {
        return ResponseEntity.ok(
                ProductMapper.toResponse(products.get(id))
        );
    }

    // ==================================================
    // CREATE PRODUCT
    // ==================================================
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody ProductCreateRequest request
    ) {
        var product = products.create(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ProductMapper.toResponse(product));
    }

    // ==================================================
    // UPDATE PRODUCT
    // ==================================================
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ProductUpdateRequest request
    ) {
        var updated = products.update(id, request);
        return ResponseEntity.ok(
                ProductMapper.toResponse(updated)
        );
    }

    // ==================================================
    // DELETE PRODUCT
    // ==================================================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        products.delete(id);
        return ResponseEntity.noContent().build();
    }
 // ==================================================
 // S3 MULTI IMAGE UPLOAD ✅
 // ==================================================
 @PostMapping("/upload")
 public ResponseEntity<java.util.List<String>> uploadMultiple(
         @RequestParam("files") java.util.List<MultipartFile> files
 ) throws Exception {

     if (files == null || files.isEmpty()) {
         return ResponseEntity.badRequest().body(java.util.List.of("Files cannot be empty"));
     }

     java.util.List<String> urls = new java.util.ArrayList<>();

     for (MultipartFile file : files) {
         if (file == null || file.isEmpty()) continue;
         String url = s3Service.uploadFile(file);
         urls.add(url);
     }

     if (urls.isEmpty()) {
         return ResponseEntity.badRequest().body(java.util.List.of("No valid files uploaded"));
     }

     return ResponseEntity.ok(urls);
 }
    // ==================================================
    // COMMON PAGE BUILDER
    // ==================================================
    private PageResponse<ProductResponse> buildPageResponse(
            org.springframework.data.domain.Page<com.ssgroup.shop.entity.Product> result
    ) {
        return PageResponse.<ProductResponse>builder()
                .items(
                        result.getContent()
                                .stream()
                                .map(ProductMapper::toResponse)
                                .toList()
                )
                .page(result.getNumber())
                .size(result.getSize())
                .totalItems(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .build();
    }
}
