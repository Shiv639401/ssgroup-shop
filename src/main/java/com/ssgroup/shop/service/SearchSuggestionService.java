package com.ssgroup.shop.service;


import com.ssgroup.shop.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchSuggestionService {

    private final ProductRepository products;

    @Transactional(readOnly = true)
    public List<String> suggest(String q, int limit) {
        if (q == null) return List.of();

        String query = q.trim();
        if (query.length() < 2) return List.of(); // avoid spam + heavy queries

        int safeLimit = Math.min(Math.max(limit, 1), 15);

        var page = PageRequest.of(0, safeLimit);

        // 1) Prefix first (best UX)
        List<String> prefix = products.findTitleSuggestionsByPrefix(query, page);

        // 2) Contains fallback (if prefix results less)
        List<String> contains = List.of();
        if (prefix.size() < safeLimit) {
            contains = products.findTitleSuggestionsContains(query, page);
        }

        // merge unique + keep order
        LinkedHashSet<String> merged = new LinkedHashSet<>();
        merged.addAll(prefix);
        merged.addAll(contains);

        return merged.stream().limit(safeLimit).toList();
    }
}
