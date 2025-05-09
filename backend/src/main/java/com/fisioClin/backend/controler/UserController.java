package com.fisioClin.backend.controler;

import com.fisioClin.backend.model.User;
import com.fisioClin.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> listar() {
        return userService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> buscarPorId(@PathVariable Long id) {
        return userService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User criar(@RequestBody User user) {
        return userService.salvar(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> atualizar(@PathVariable Long id, @RequestBody User novoUser) {
        return userService.buscarPorId(id)
            .map(user -> {
                user.setNome(novoUser.getNome());
                user.setSenha(novoUser.getSenha());
                user.setCpf(novoUser.getCpf());
                user.setData_nasc(novoUser.getData_nasc());
                return ResponseEntity.ok(userService.salvar(user));
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        userService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
