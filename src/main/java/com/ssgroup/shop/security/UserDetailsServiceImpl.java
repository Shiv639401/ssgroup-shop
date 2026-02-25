package com.ssgroup.shop.security;



import java.util.List;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import com.ssgroup.shop.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepository users;

  public UserDetailsServiceImpl(UserRepository users) {
    this.users = users;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    var u = users.findByEmail(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    return new org.springframework.security.core.userdetails.User(
      u.getEmail(),
      u.getPasswordHash(),
      List.of(new SimpleGrantedAuthority(u.getRole().name()))
    );
  }
}
