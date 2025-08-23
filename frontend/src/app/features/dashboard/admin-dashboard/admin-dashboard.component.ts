import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/models/components/modal/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  sidebarOpen = false;
  accountOpen = false;

  constructor(
    public auth: AuthService,
    private dialog: MatDialog
  ) {}

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

    const ref = this.dialog.open(ConfirmDialogComponent, { data });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.auth.logout();
      }
    });
  }
}
