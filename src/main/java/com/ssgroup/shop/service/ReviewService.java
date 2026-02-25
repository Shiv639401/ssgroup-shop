package com.ssgroup.shop.service;


import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssgroup.shop.dto.review.ReviewCreateRequest;
import com.ssgroup.shop.entity.Product;
import com.ssgroup.shop.entity.Review;
import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.OrderRepository;
import com.ssgroup.shop.repository.ProductRepository;
import com.ssgroup.shop.repository.ReviewRepository;
import com.ssgroup.shop.repository.UserRepository;

@Service
public class ReviewService {

  private final ReviewRepository reviews;
  private final ProductRepository products;
  private final UserRepository users;
  private final OrderRepository orders;

  public ReviewService(ReviewRepository reviews, ProductRepository products, UserRepository users, OrderRepository orders) {
    this.reviews = reviews;
    this.products = products;
    this.users = users;
    this.orders = orders;
  }

  public List<Review> listByProduct(Long productId) {
    return reviews.findByProduct_IdOrderByCreatedAtDesc(productId);
  }

  @Transactional
  public Review addOrUpdate(Long userId, ReviewCreateRequest req) {

    User u = users.findById(userId).orElseThrow();
    Product p = products.findById(req.getProductId()).orElseThrow();

    boolean verified = orders.hasDeliveredPurchase(userId, p.getId());
    if (!verified) {
      throw new BadRequestException("Only verified purchase users can review this product");
    }

    // if already reviewed -> update rating
    Review existing = reviews.findByUser_IdAndProduct_Id(userId, p.getId()).orElse(null);

    if (existing == null) {
      Review r = Review.builder()
        .user(u)
        .product(p)
        .rating(req.getRating())
        .comment(req.getComment())
        .verifiedPurchase(true)
        .createdAt(Instant.now())
        .build();

      Review saved = reviews.save(r);

      // ✅ update product rating
      recalcProductRating(p.getId());

      return saved;
    } else {
      existing.setRating(req.getRating());
      existing.setComment(req.getComment());

      Review saved = reviews.save(existing);

      // ✅ update product rating
      recalcProductRating(p.getId());

      return saved;
    }
  }

  @Transactional
  public void recalcProductRating(Long productId) {
    Product p = products.findById(productId).orElseThrow();
    var list = reviews.findByProduct_IdOrderByCreatedAtDesc(productId);

    if (list.isEmpty()) {
      p.setRatingAvg(0.0);
      p.setRatingCount(0);
      return;
    }

    double avg = list.stream().mapToInt(Review::getRating).average().orElse(0.0);
    p.setRatingAvg(avg);
    p.setRatingCount(list.size());
  }
}
