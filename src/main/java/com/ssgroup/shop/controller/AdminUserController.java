package com.ssgroup.shop.controller;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssgroup.shop.entity.User;
import com.ssgroup.shop.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminUserController {

    private final UserRepository userRepository;

    public AdminUserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

@PutMapping("/users/{id}/toggle")
public User toggleUser(@PathVariable Long id) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

    user.setActive(!user.isActive());
    return userRepository.save(user);
}
}