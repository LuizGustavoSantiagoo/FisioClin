import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { ClrInputModule, ClrPasswordModule, ClrIconModule } from '@clr/angular';  // Adicionando o módulo de input
import { AuthService } from '../../services/AuthService'; // Importando AuthService

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ClrInputModule,
    ClrPasswordModule,
    ClrIconModule    // Adicionando ClrInputModule para usar clr-input-container
  ],
  providers: [AuthService] // Registrando AuthService como provider
})
export class LoginPageComponent {
  title = 'Login';
  form = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.form).subscribe({
      next: (res) => {
        this.authService.redirectTo('home');
      },
      error: (err) => {
      }
    });
  }

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
    const input = document.querySelector('input[name="senha"]') as HTMLInputElement;
    input.type = this.showPassword ? 'text' : 'password';
    console.log(this.showPassword)
  }
}



