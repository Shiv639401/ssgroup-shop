package com.ssgroup.shop.controller;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.service.AdminCategoryService;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

  private final AdminCategoryService categories;

  public AdminCategoryController(AdminCategoryService categories) {
    this.categories = categories;
  }

  @GetMapping
  public Object all() { return categories.all(); }

  @PostMapping
  public Object create(@RequestBody java.util.Map<String,String> body) {
    String name = body.get("name");
    return categories.create(name);
  }

  @PutMapping("/{id}")
  public Object update(@PathVariable Long id, @RequestBody java.util.Map<String,String> body) {
    return categories.update(id, body.get("name"));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    categories.delete(id);
  }
}
