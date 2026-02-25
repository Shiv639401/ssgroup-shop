package com.ssgroup.shop.dto.search;


import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SuggestionResponse {
    private String query;
    private List<String> suggestions;
}
