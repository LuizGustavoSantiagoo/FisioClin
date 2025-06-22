import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-atendimentos',
  imports: [HeaderComponent, MatIcon],
  templateUrl: './atendimentos.component.html',
  styleUrl: './atendimentos.component.css'
})
export class AtendimentosComponent {

}
