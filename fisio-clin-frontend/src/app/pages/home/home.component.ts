import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth.service';

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
