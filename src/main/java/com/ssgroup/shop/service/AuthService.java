package com.ssgroup.shop.service;



import java.time.Instant;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssgroup.shop.dto.auth.AuthResponse;
import com.ssgroup.shop.dto.auth.LoginRequest;
import com.ssgroup.shop.dto.auth.RegisterRequest;
import com.ssgroup.shop.entity.Role;
import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.exception.BadRequestException;
import com.ssgroup.shop.repository.UserRepository;
import com.ssgroup.shop.security.JwtService;

@Service
public class AuthService {

  private final UserRepository users;
  private final PasswordEncoder encoder;
  private final AuthenticationManager authManager;
  private final JwtService jwt;

  public AuthService(UserRepository users, PasswordEncoder encoder, AuthenticationManager authManager, JwtService jwt) {
    this.users = users;
    this.encoder = encoder;
    this.authManager = authManager;
    this.jwt = jwt;
  }

  public AuthResponse register(RegisterRequest req) {
    if (users.existsByEmail(req.getEmail())) throw new BadRequestException("Email already registered");

    User u = User.builder()
      .fullName(req.getFullName())
      .email(req.getEmail().toLowerCase())
      .passwordHash(encoder.encode(req.getPassword()))
      .role(Role.ROLE_USER)
      .createdAt(Instant.now())
      .build();

    users.save(u);

    return AuthResponse.builder()
      .email(u.getEmail())
      .fullName(u.getFullName())
      .role(u.getRole().name())
      .accessToken(jwt.generateAccessToken(u.getId(), u.getEmail(), u.getRole()))
      .refreshToken(jwt.generateRefreshToken(u.getId(), u.getEmail(), u.getRole()))
      .build();
  }

  public AuthResponse login(LoginRequest req) {
    try {
    	authManager.authenticate(
    		    new UsernamePasswordAuthenticationToken(req.getEmail().toLowerCase(), req.getPassword())
    		);

    } catch (AuthenticationException e) {
      throw new BadRequestException("Invalid email or password");
    }

    User u = users.findByEmail(req.getEmail().toLowerCase())
      .orElseThrow(() -> new BadRequestException("Invalid email or password"));

    return AuthResponse.builder()
      .email(u.getEmail())
      .fullName(u.getFullName())
      .role(u.getRole().name())
      .accessToken(jwt.generateAccessToken(u.getId(), u.getEmail(), u.getRole()))
      .refreshToken(jwt.generateRefreshToken(u.getId(), u.getEmail(), u.getRole()))
      .build();
  }
}
