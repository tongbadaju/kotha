import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from './forms/login.component';
import { ForgotPasswordComponent } from './forms/forgot-password.component';
import { RegisterComponent } from './forms/register.component';

export type AuthView = 'login' | 'register' | 'forgot';

interface AuthDialogData {
  initialView?: AuthView;
}

@Component({
  selector: 'app-auth',
  imports: [CommonModule, LoginComponent, ForgotPasswordComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  view: AuthView;

  constructor(
    private dialogRef: MatDialogRef<AuthComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AuthDialogData
  ) {
    // default to login if nothing passed
    this.view = data.initialView ?? 'login';
  }

  close() {
    this.dialogRef.close();
  }
}

