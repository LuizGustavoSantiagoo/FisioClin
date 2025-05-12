import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,  // O componente é standalone
  templateUrl: './app.component.html',
  imports: [RouterModule]
})
export class AppComponent {
  title = 'Meu Projeto Angular';
}
