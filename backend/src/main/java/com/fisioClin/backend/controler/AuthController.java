package com.fisioClin.backend.controler;

import com.fisioClin.backend.dto.LoginDTO;
import com.fisioClin.backend.model.User;
import com.fisioClin.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<User> usuario = authService.autenticar(loginDTO);

        return usuario
            .map(user -> ResponseEntity.ok().body("Login realizado com sucesso!"))
            .orElseGet(() -> ResponseEntity.status(401).body("Credenciais inválidas."));
    }
}
