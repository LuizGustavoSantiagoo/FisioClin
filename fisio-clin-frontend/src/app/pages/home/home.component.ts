import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
