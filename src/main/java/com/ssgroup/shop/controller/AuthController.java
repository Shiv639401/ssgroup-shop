package com.ssgroup.shop.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.dto.auth.AuthResponse;
import com.ssgroup.shop.dto.auth.LoginRequest;
import com.ssgroup.shop.dto.auth.RegisterRequest;
import com.ssgroup.shop.service.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService auth;

  public AuthController(AuthService auth) {
    this.auth = auth;
  }

  @PostMapping("/register")
  public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
    return auth.register(req);
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest req) {
    return auth.login(req);
  }
}
