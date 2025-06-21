import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../features/auth/services/auth.service'; // Mantenha a importação do seu AuthService
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
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.errorMessage = ''; // Limpa mensagens de erro anteriores

    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;

      // Chama o método login do AuthService.
      // O AuthService já cuidará de salvar o token e os dados do usuário no localStorage
      // e de atualizar seu estado interno (via BehaviorSubject).
      this.authService.login({ email, senha }).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido! O AuthService salvou os dados.', response);
          // O redirecionamento aqui significa que o login foi completo e os dados estão salvos.
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          // A mensagem de erro já deve vir formatada do AuthService ou do backend
          this.errorMessage = error.message || 'Ocorreu um erro. Tente novamente mais tarde.';
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