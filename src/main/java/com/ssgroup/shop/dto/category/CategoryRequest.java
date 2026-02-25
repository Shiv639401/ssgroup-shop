package com.ssgroup.shop.dto.category;



import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class CategoryRequest {
  @NotBlank
  private String name;
  @NotBlank
  private String slug;
}
