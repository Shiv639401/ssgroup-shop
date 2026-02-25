package com.ssgroup.shop.service;

import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.dto.product.ProductCreateRequest;
import com.ssgroup.shop.dto.product.ProductUpdateRequest;
import com.ssgroup.shop.entity.Category;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.ProductImage;
import com.ssgroup.shop.repository.CategoryRepository;
import com.ssgroup.shop.repository.NotFoundException;
import com.ssgroup.shop.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository products;
    private final CategoryRepository categories;

    public ProductService(ProductRepository products, CategoryRepository categories) {
        this.products = products;
        this.categories = categories;
    }

    // ✅ Detail fetch (Transactional for lazy loading)
    @Transactional(readOnly = true)
    public Product get(Long id) {
        Product product = products.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found"));

        // Force images load
        product.getImages().size();

        return product;
    }

    // ✅ FIXED SEARCH METHOD
    @Transactional(readOnly = true)
    public Page<Product> search(String q, String categorySlug, int page, int size, String sort) {

        Sort s = switch (sort == null ? "" : sort) {
            case "price_asc" -> Sort.by("price").ascending();
            case "price_desc" -> Sort.by("price").descending();
            case "newest" -> Sort.by("createdAt").descending();
            default -> Sort.by("createdAt").descending();
        };

        Pageable pageable = PageRequest.of(page, size, s);

        boolean hasQ = q != null && !q.isBlank();
        boolean hasCat = categorySlug != null && !categorySlug.isBlank();

        Page<Product> result;

        if (hasQ && hasCat)
            result = products.findByCategory_SlugAndTitleContainingIgnoreCase(categorySlug, q, pageable);
        else if (hasCat)
            result = products.findByCategory_Slug(categorySlug, pageable);
        else if (hasQ)
            result = products.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q, pageable);
        else
            result = products.findAll(pageable);

        // 🔥 FORCE LAZY LOAD IMAGES FOR LIST PAGE
        result.getContent().forEach(p -> p.getImages().size());

        return result;
    }

    public Product create(ProductCreateRequest req) {

        Category c = categories.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));

        Product p = Product.builder()
                .category(c)
                .title(req.getTitle())
                .description(req.getDescription())
                .price(req.getPrice())
                .mrp(req.getMrp())
                .stock(req.getStock())
                .rating(req.getRating())
                .createdAt(Instant.now())
                .build();

        for (int i = 0; i < req.getImageUrls().size(); i++) {
            p.getImages().add(ProductImage.builder()
                    .product(p)
                    .url(req.getImageUrls().get(i))
                    .sortOrder(i)
                    .build());
        }

        return products.save(p);
    }

    public Product update(Long id, ProductUpdateRequest req) {

        Product p = get(id);

        Category c = categories.findById(req.getCategoryId())
                .orElseThrow(() -> new NotFoundException("Category not found"));

        p.setCategory(c);
        p.setTitle(req.getTitle());
        p.setDescription(req.getDescription());
        p.setPrice(req.getPrice());
        p.setMrp(req.getMrp());
        p.setStock(req.getStock());
        p.setRating(req.getRating());

        p.getImages().clear();

        for (int i = 0; i < req.getImageUrls().size(); i++) {
            p.getImages().add(ProductImage.builder()
                    .product(p)
                    .url(req.getImageUrls().get(i))
                    .sortOrder(i)
                    .build());
        }

        return products.save(p);
    }

    public void delete(Long id) {
        products.delete(get(id));
    }
}
