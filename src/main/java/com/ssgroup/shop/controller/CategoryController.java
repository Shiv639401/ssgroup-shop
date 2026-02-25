package com.ssgroup.shop.controller;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ssgroup.shop.mapper.CategoryMapper;
import com.ssgroup.shop.service.CategoryService;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

  private final CategoryService categories;

  public CategoryController(CategoryService categories) {
    this.categories = categories;
  }

  @GetMapping
  public List<?> list() {
    return categories.list().stream().map(CategoryMapper::toResponse).toList();
  }
}
