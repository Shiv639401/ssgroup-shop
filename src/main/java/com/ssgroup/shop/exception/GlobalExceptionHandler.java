package com.ssgroup.shop.exception;



import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ssgroup.shop.dto.common.ApiError;
import com.ssgroup.shop.repository.NotFoundException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiError> notFound(NotFoundException ex, HttpServletRequest req) {
    return build(HttpStatus.NOT_FOUND, ex.getMessage(), req);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ApiError> badRequest(BadRequestException ex, HttpServletRequest req) {
    return build(HttpStatus.BAD_REQUEST, ex.getMessage(), req);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiError> validation(MethodArgumentNotValidException ex, HttpServletRequest req) {
    String msg = ex.getBindingResult().getFieldErrors().stream()
      .findFirst()
      .map(fe -> fe.getField() + " " + fe.getDefaultMessage())
      .orElse("Validation failed");
    return build(HttpStatus.BAD_REQUEST, msg, req);
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiError> violation(ConstraintViolationException ex, HttpServletRequest req) {
    return build(HttpStatus.BAD_REQUEST, ex.getMessage(), req);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiError> any(Exception ex, HttpServletRequest req) {
    return build(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong", req);
  }

  private ResponseEntity<ApiError> build(HttpStatus status, String msg, HttpServletRequest req) {
    ApiError err = ApiError.builder()
      .timestamp(Instant.now())
      .status(status.value())
      .error(status.getReasonPhrase())
      .message(msg)
      .path(req.getRequestURI())
      .build();
    return ResponseEntity.status(status).body(err);
  }
}

