package com.ssgroup.shop.controller;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssgroup.shop.service.BulkUploadService;

@RestController
@RequestMapping("/api/admin/bulk")
public class AdminBulkUploadController {

  private final BulkUploadService bulk;

  public AdminBulkUploadController(BulkUploadService bulk) {
    this.bulk = bulk;
  }

  @PostMapping("/products-csv")
  public Object upload(@RequestParam("file") MultipartFile file) {
    int count = bulk.uploadProductsCsv(file);
    return java.util.Map.of("uploaded", count);
  }
}
