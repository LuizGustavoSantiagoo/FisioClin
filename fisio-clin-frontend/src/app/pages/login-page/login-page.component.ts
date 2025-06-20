import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm!: FormGroup;
  passwordType: string = 'password';
  errorMessage: string = '';

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]), // Adicionado Validators.email para melhor validação
      senha: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      this.authService.login({ email, senha }).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido!', response);

          // --- Início das Alterações para Salvar Dados na Sessão (Local Storage) ---

          // 1. Salva o token de autenticação no Local Storage
          // O Local Storage é ideal para manter o usuário logado mesmo após fechar o navegador.
          localStorage.setItem('auth_token', response.token);

          // 2. Salva os dados do usuário (incluindo a role) no Local Storage
          // Converte o objeto 'user' para uma string JSON antes de salvar, pois o Local Storage só armazena strings.
          localStorage.setItem('user_data', JSON.stringify(response.user));

          // Opcional: Para verificar se a role foi salva corretamente
          const userDataStored = localStorage.getItem('user_data');
          if (userDataStored) {
            const user = JSON.parse(userDataStored);
            console.log('Dados do usuário salvos:', user);
            console.log('Role do usuário salva:', user.role);
          }

          // --- Fim das Alterações ---

          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          if (error.status === 401 || error.status === 422) {
            this.errorMessage = error.error.message || 'Email ou senha inválidos.';
          } else {
            this.errorMessage = 'Ocorreu um erro. Tente novamente mais tarde.';
          }
        }
      });
    } else {
      console.log('Formulário inválido. Preencha todos os campos.');
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
    }
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
