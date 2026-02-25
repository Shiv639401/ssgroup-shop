package com.ssgroup.shop.mapper;


import com.ssgroup.shop.dto.category.CategoryResponse;
import com.ssgroup.shop.entity.Category;
public class CategoryMapper {
  public static CategoryResponse toResponse(Category c) {
    return CategoryResponse.builder()
      .id(c.getId())
      .name(c.getName())
      .slug(c.getSlug())
      .build();
  }
}
