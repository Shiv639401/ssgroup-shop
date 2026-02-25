package com.ssgroup.shop.security;


import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ssgroup.shop.entity.Role;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

  private final Key key;
  private final long accessExpMin;
  private final long refreshExpDays;

  public JwtService(
      @Value("${app.jwt.secret}") String secret,
      @Value("${app.jwt.access-exp-min}") long accessExpMin,
      @Value("${app.jwt.refresh-exp-days}") long refreshExpDays
  ) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    this.accessExpMin = accessExpMin;
    this.refreshExpDays = refreshExpDays;
  }

  public String generateAccessToken(Long userId, String email, Role role) {
    Instant now = Instant.now();
    Instant exp = now.plus(accessExpMin, ChronoUnit.MINUTES);

    return Jwts.builder()
      .setSubject(email)
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(exp))
      .addClaims(Map.of("uid", userId, "role", role.name(), "typ", "access"))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();
  }

  public String generateRefreshToken(Long userId, String email, Role role) {
    Instant now = Instant.now();
    Instant exp = now.plus(refreshExpDays, ChronoUnit.DAYS);

    return Jwts.builder()
      .setSubject(email)
      .setIssuedAt(Date.from(now))
      .setExpiration(Date.from(exp))
      .addClaims(Map.of("uid", userId, "role", role.name(), "typ", "refresh"))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();
  }

  public Claims parseClaims(String token) {
    return Jwts.parserBuilder()
      .setSigningKey(key)
      .build()
      .parseClaimsJws(token)
      .getBody();
  }
}


