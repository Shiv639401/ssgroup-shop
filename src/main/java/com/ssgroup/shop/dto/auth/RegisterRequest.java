package com.ssgroup.shop.dto.auth;



import jakarta.validation.constraints.*;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class RegisterRequest {
  @NotBlank @Size(min=2, max=60)
  private String fullName;

  @NotBlank @Email
  private String email;

  @NotBlank @Size(min=6, max=100)
  private String password;
}
