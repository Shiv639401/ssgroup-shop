package com.ssgroup.shop.dto.auth;



import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class AuthResponse {
  private String accessToken;
  private String refreshToken;
  private String role;
  private String email;
  private String fullName;
}
