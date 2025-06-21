import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:
    [MatSidenavModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      RouterOutlet,
      RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  showFiller = false;

  currentUser: User | null = null;
  private userSubscription: Subscription | undefined;
  @ViewChild('drawer') drawer!: MatDrawer;

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
    location.reload();
  }

  toggleSidenavAndButton(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}