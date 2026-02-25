package com.ssgroup.shop.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    public JwtAuthFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {
                Claims claims = jwtService.parseClaims(token);

                // Only allow access tokens
                if (!"access".equals(String.valueOf(claims.get("typ")))) {
                    chain.doFilter(request, response);
                    return;
                }

                String email = claims.getSubject();
                String role = claims.get("role", String.class);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    var authorities = List.of(
                            new SimpleGrantedAuthority(role) // IMPORTANT: No "ROLE_" prefix here
                    );

                    var auth = new UsernamePasswordAuthenticationToken(
                            email,
                            null,
                            authorities
                    );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception ignored) {
                // Invalid token -> continue unauthenticated
            }
        }

        chain.doFilter(request, response);
    }
}