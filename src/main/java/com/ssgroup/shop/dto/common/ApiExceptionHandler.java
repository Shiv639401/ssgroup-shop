package com.ssgroup.shop.dto.common;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntime(RuntimeException ex) {
        Map<String, Object> res = new HashMap<>();
        res.put("message", ex.getMessage());
        return ResponseEntity.badRequest().body(res);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleAny(Exception ex) {
        Map<String, Object> res = new HashMap<>();
        res.put("message", "Internal Server Error");
        res.put("error", ex.getClass().getSimpleName());
        return ResponseEntity.internalServerError().body(res);
    }
}