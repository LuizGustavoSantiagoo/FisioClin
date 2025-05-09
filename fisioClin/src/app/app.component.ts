import { Component } from '@angular/core';
import { LoginPageComponent } from "./components/login-page/login-page.component";

@Component({
  selector: 'app-root',
  standalone: true,  // O componente é standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LoginPageComponent]
})
export class AppComponent {
  title = 'Meu Projeto Angular';
}
