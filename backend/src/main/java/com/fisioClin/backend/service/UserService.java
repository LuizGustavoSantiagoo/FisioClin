package com.fisioClin.backend.service;

import com.fisioClin.backend.model.User;
import com.fisioClin.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> listarTodos() {
        return userRepository.findAll();
    }

    public Optional<User> buscarPorId(Long id) {
        return userRepository.findById(id);
    }

    public User salvar(User user) {
        return userRepository.save(user);
    }

    public void deletar(Long id) {
        userRepository.deleteById(id);
    }
}
