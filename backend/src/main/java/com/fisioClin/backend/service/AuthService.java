package com.fisioClin.backend.service;

import com.fisioClin.backend.dto.LoginDTO;
import com.fisioClin.backend.model.User;
import com.fisioClin.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository UserRepository;

    public AuthService(UserRepository UserRepository) {
        this.UserRepository = UserRepository;
    }

    public Optional<User> autenticar(LoginDTO loginDTO) {
        Optional<User> usuarioOpt = Optional.ofNullable(UserRepository.findByCpf(loginDTO.getUsername()));

        return usuarioOpt.filter(u -> u.getSenha().equals(loginDTO.getPassword()));
    }
}
