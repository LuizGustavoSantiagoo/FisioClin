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
      cpf: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.valid) {
      const { cpf, senha } = this.loginForm.value;

      this.authService.login({ cpf, senha }).subscribe({
        next: (response) => {
          console.log('Login bem-sucedido!', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          if (error.status === 401 || error.status === 422) {
            this.errorMessage = error.error.message || 'CPF ou senha inválidos.';
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
