package com.ssgroup.shop.dto.admin;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class BannerRequest {
  @NotBlank
  private String title;

  @NotBlank
  private String imageUrl;

  private String redirectUrl;

  @NotNull
  private Boolean active;

  @NotNull
  private Integer sortOrder;
}
