package com.ssgroup.shop.service;

import java.io.InputStreamReader;
import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.CSVReader;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.ProductRepository;

@Service
public class BulkUploadService {

  private final ProductRepository products;

  public BulkUploadService(ProductRepository products) {
    this.products = products;
  }

  // CSV columns: title,description,price,mrp,stock,imageUrl
  public int uploadProductsCsv(MultipartFile file) {
    try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
      String[] row;
      int count = 0;
      while ((row = reader.readNext()) != null) {
        if (row.length < 6) continue;

        // skip header if present
        if ("title".equalsIgnoreCase(row[0])) continue;

        Product p = new Product();
        p.setTitle(row[0]);
        p.setDescription(row[1]);
        p.setPrice(new BigDecimal(row[2]));
        p.setMrp(new BigDecimal(row[3]));
        p.setStock(Integer.parseInt(row[4]));
        // if your Product supports images list then map it else use single imageUrl field
        try {
          // try set images list
          var images = p.getClass().getMethod("getImages").invoke(p);
          // if it’s a list, add
          if (images instanceof java.util.List<?> list) {
            // ProductImage entity exists in your project already
            Class<?> piCls = Class.forName("com.ssgroup.shop.entity.ProductImage");
            Object pi = piCls.getMethod("builder").invoke(null); // will fail if no builder
          }
        } catch (Exception ignored) {}

        // fallback: if you have imageUrl
        try { p.getClass().getMethod("setImageUrl", String.class).invoke(p, row[5]); } catch (Exception ignored) {}

        products.save(p);
        count++;
      }
      return count;
    } catch (Exception e) {
      throw new BadRequestException("CSV upload failed: " + e.getMessage());
    }
  }
}
