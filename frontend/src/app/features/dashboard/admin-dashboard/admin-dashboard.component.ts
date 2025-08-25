import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Account } from '../../../core/models/account.model';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  sidebarOpen = false;
  accountOpen = false;

  currentUser: Account | null = null;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog
  ) {}

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

  get initials(): string {
    if (!this.currentUser?.name) {
      return '';
    }
    const parts = this.currentUser.name.trim().split(/\s+/);
    return parts
      .slice(0, 2)
      .map(p => p.charAt(0).toUpperCase())
      .join('');
  }



  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleAccount() {
    this.accountOpen = !this.accountOpen;
  }

  logout() {
    const data: ConfirmDialogData = {
      title: 'Log Out',
      message: 'Are you sure you want to log out?',
      confirmText: 'Log Out',
      cancelText: 'Cancel'
    };

    const ref = this.dialog.open(ConfirmDialogComponent, { 
      data,
      panelClass: [ 'rounded-lg', 'overflow-hidden' ]
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed === true) {
        this.auth.logout();
      }
    });
  }
}
