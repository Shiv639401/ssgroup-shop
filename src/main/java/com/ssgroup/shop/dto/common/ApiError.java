package com.ssgroup.shop.dto.common;



import java.time.Instant;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class ApiError {
  private Instant timestamp;
  private int status;
  private String error;
  private String message;
  private String path;
}
