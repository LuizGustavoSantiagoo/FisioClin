import { Component, OnInit, OnDestroy } from '@angular/core'; // Importe OnInit e OnDestroy
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '../../features/auth/services/auth.service'; // Mantenha a importação do seu AuthService
import { User } from '../../interfaces/user.interface'; // Importe sua interface de usuário
import { Subscription } from 'rxjs'; // Importe Subscription para gerenciar a inscrição

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  showFiller = false;

  currentUser: User | null = null;
  private userSubscription: Subscription | undefined;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user; 
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}