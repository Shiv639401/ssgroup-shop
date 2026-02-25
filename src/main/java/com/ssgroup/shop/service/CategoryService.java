package com.ssgroup.shop.service;



import java.util.List;

import org.springframework.stereotype.Service;

import com.ssgroup.shop.dto.category.CategoryRequest;
import com.ssgroup.shop.entity.Category;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.CategoryRepository;
import com.ssgroup.shop.repository.NotFoundException;

@Service
public class CategoryService {
  private final CategoryRepository categories;

  public CategoryService(CategoryRepository categories) {
    this.categories = categories;
  }

  public List<Category> list() {
    return categories.findAll();
  }

  public Category get(Long id) {
    return categories.findById(id).orElseThrow(() -> new NotFoundException("Category not found"));
  }

  public Category create(CategoryRequest req) {
    if (categories.existsBySlug(req.getSlug())) throw new BadRequestException("Category slug already exists");
    Category c = Category.builder().name(req.getName()).slug(req.getSlug()).build();
    return categories.save(c);
  }
}
