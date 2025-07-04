import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '../../interfaces/user.interface';
import { Subscription } from 'rxjs';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router'; // Adicionado NavigationEnd
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators'; // Adicionado filter
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:
    [MatSidenavModule,
      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      RouterOutlet,
      RouterModule,
      CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit, OnDestroy {
  showFiller = false;
  currentUser: User | null = null;
  private userSubscription: Subscription | undefined;
  private routerSubscription: Subscription | undefined; 
  @ViewChild('drawer') drawer!: MatDrawer;

  showMenuButton: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.checkTokenPresence();
    });

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkTokenPresence();
    });

    this.checkTokenPresence();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidenavAndButton(): void {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  private checkTokenPresence(): void {
    const token = localStorage.getItem('authToken');
    this.showMenuButton = !!token;
  }
}
