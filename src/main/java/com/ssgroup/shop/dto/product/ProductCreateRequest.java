package com.ssgroup.shop.dto.product;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCreateRequest {

    // 🔹 Required
    @NotNull(message = "Category is required")
    private Long categoryId;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 140)
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 2000)
    private String description;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "1.0", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "MRP is required")
    @DecimalMin(value = "1.0", message = "MRP must be greater than 0")
    private BigDecimal mrp;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    @Builder.Default
    private Double rating = 0.0;

    // 🔥 NEW FIELD (Brand support)
    private Long brandId;

    // 🔥 NEW FIELD (Attributes)
    private List<AttributeDto> attributes;

    // 🔥 NEW FIELD (Variants)
    private List<VariantRequest> variants;

    // 🔹 Already used (Images)
    @NotNull(message = "At least one image is required")
    @Size(min = 1, max = 6, message = "You can upload 1 to 6 images")
    private List<String> imageUrls;
}
