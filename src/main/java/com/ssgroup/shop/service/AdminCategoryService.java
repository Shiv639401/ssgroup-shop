package com.ssgroup.shop.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.ssgroup.shop.entity.Category;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.CategoryRepository;

@Service
public class AdminCategoryService {

  private final CategoryRepository categories;

  public AdminCategoryService(CategoryRepository categories) {
    this.categories = categories;
  }

  public List<Category> all() {
    return categories.findAll();
  }

  public Category create(String name) {
    if (name == null || name.isBlank()) throw new BadRequestException("Name required");
    Category c = new Category();
    c.setName(name.trim());
    c.setSlug(slugify(name));
    // if your Category has createdAt field then set it, else remove next line
    try { Category.class.getMethod("setCreatedAt", Instant.class).invoke(c, Instant.now()); } catch (Exception ignored) {}
    return categories.save(c);
  }

  public Category update(Long id, String name) {
    Category c = categories.findById(id).orElseThrow(() -> new BadRequestException("Category not found"));
    c.setName(name.trim());
    c.setSlug(slugify(name));
    return categories.save(c);
  }

  public void delete(Long id) {
    categories.deleteById(id);
  }

  private String slugify(String text) {
    return text.toLowerCase()
        .replaceAll("[^a-z0-9]+", "-")
        .replaceAll("(^-|-$)", "");
  }
}
