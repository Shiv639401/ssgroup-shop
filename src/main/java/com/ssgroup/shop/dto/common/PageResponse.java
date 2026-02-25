package com.ssgroup.shop.dto.common;



import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PageResponse<T> {
  private List<T> items;
  private int page;
  private int size;
  private long totalItems;
  private int totalPages;
}
