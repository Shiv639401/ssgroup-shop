package com.ssgroup.shop.controller;



import org.springframework.web.bind.annotation.*;

import com.ssgroup.shop.dto.product.ProductCreateRequest;
import com.ssgroup.shop.dto.product.ProductUpdateRequest;
import com.ssgroup.shop.mapper.ProductMapper;
import com.ssgroup.shop.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

  private final ProductService products;

  public AdminProductController(ProductService products) {
    this.products = products;
  }

  @PostMapping
  public Object create(@Valid @RequestBody ProductCreateRequest req) {
    return ProductMapper.toResponse(products.create(req));
  }

  @PutMapping("/{id}")
  public Object update(@PathVariable Long id, @Valid @RequestBody ProductUpdateRequest req) {
    return ProductMapper.toResponse(products.update(id, req));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    products.delete(id);
  }
}
