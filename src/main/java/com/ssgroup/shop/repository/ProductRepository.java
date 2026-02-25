package com.ssgroup.shop.repository;



import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ssgroup.shop.entity.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

	  Page<Product> findByCategory_Slug(String slug, Pageable pageable);

	  Page<Product> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String t, String d, Pageable pageable);

	  Page<Product> findByCategory_SlugAndTitleContainingIgnoreCase(String slug, String q, Pageable pageable);
	  @Query("""
			   select distinct p.title
			   from Product p
			   where lower(p.title) like lower(concat(:prefix, '%'))
			   order by p.createdAt desc
			""")
			List<String> findTitleSuggestionsByPrefix(@Param("prefix") String prefix, Pageable pageable);

			@Query("""
			   select distinct p.title
			   from Product p
			   where lower(p.title) like lower(concat('%', :q, '%'))
			   order by p.createdAt desc
			""")
			List<String> findTitleSuggestionsContains(@Param("q") String q, Pageable pageable);
			// Under ₹X
		    List<Product> findByPriceLessThanEqual(BigDecimal maxPrice);

		    // Hot deals running
		    List<Product> findByHotDealTrueAndDealEndAfter(Instant now);

		    // Buy 1 get 1
		    List<Product> findByBuyOneGetOneTrue();

		    // Flat X% off
		    List<Product> findByDiscountPercentGreaterThanEqual(Integer percent);

		    // Trending
		    @Query("SELECT p FROM Product p ORDER BY p.totalSold DESC, p.viewCount DESC, p.ratingAvg DESC")
		    List<Product> findTrending(Pageable pageable);
}
