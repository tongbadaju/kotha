import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Account } from '../../core/models/account.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthView, AuthComponent } from '../../features/auth/auth.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  isMenuOpen = false;
  showLogin: boolean = false;
  showRegister: boolean = false;
  currentUser: Account | null = null;

  constructor(public auth: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    // Subscribe to user changes
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // If already logged in (token exists), fetch profile
    if (this.auth.isLoggedIn()) {
      this.auth.fetchCurrentUser().subscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openAuth(startView: AuthView) {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      panelClass: ['rounded-xl', 'overflow-hidden'],
      data: { initialView: startView },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '200ms'
    });
  }

  logout() {
    this.auth.logout();
  }
}
