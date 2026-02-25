package com.ssgroup.shop.controller;



import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.UserRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/users")
public class UserController {

  private final UserRepository users;

  public UserController(UserRepository users) {
    this.users = users;
  }

  public static class UpdateMeRequest {
    @NotBlank
    public String fullName;
  }

  @GetMapping("/me")
  public Object me(Authentication auth) {
    var user = users.findByEmail(auth.getName()).orElseThrow();
    return new Object() {
      public final Long id = user.getId();
      public final String fullName = user.getFullName();
      public final String email = user.getEmail();
      public final String role = user.getRole().name();
    };
  }

  @PutMapping("/me")
  public Object updateMe(Authentication auth, @Valid @RequestBody UpdateMeRequest req) {
    var user = users.findByEmail(auth.getName())
        .orElseThrow(() -> new BadRequestException("User not found"));

    user.setFullName(req.fullName.trim());
    users.save(user);

    return new Object() {
      public final Long id = user.getId();
      public final String fullName = user.getFullName();
      public final String email = user.getEmail();
      public final String role = user.getRole().name();
    };
  }
}