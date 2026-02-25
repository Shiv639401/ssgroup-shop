package com.ssgroup.shop.controller;



import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.service.WishlistService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

  private final WishlistService wishlist;
  private final UserRepository users;

  public WishlistController(WishlistService wishlist, UserRepository users) {
    this.wishlist = wishlist;
    this.users = users;
  }

  private Long uid(Authentication auth) {
    return users.findByEmail(auth.getName()).orElseThrow().getId();
  }

  @GetMapping
  public Object list(Authentication auth) {
    return wishlist.list(uid(auth)).stream().map(w -> java.util.Map.of(
      "productId", w.getProduct().getId(),
      "title", w.getProduct().getTitle(),
      "image", w.getProduct().getImages().isEmpty() ? "" : w.getProduct().getImages().get(0).getUrl(),
      "price", w.getProduct().getPrice(),
      "mrp", w.getProduct().getMrp(),
      "rating", w.getProduct().getRating()
    )).toList();
  }

  @PostMapping("/{productId}/toggle")
  public void toggle(Authentication auth, @PathVariable Long productId) {
    wishlist.toggle(uid(auth), productId);
  }
}
