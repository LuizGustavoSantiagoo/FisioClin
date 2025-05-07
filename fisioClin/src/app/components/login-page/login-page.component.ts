import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { ClrDropdownModule, ClrSelectModule, ClrInputModule, ClrCheckboxModule, ClrPasswordModule } from '@clr/angular';  // Adicionando o módulo de input

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [
    FormsModule,        // Adicionando FormsModule para ngModel
    ClrDropdownModule,  // Adicionando ClrDropdownModule
    ClrSelectModule,    // Adicionando ClrSelectModule
    ClrInputModule,
    ClrCheckboxModule,
    ClrPasswordModule      // Adicionando ClrInputModule para usar clr-input-container
  ]
})
export class LoginPageComponent {
  title = 'Login';
  form = {
    type: '',
    username: '',
    password: '',
    rememberMe: false
  };
}
