import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @Output() success = new EventEmitter<void>();
  @Output() register = new EventEmitter<void>();
  @Output() forgot   = new EventEmitter<void>();

  loginForm!: FormGroup;
  submitted = false;
  loading   = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      phone: [
        '',
        [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8)]
      ]
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  onSubmit() {
    
    this.submitted = true;
    this.serverError = null;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { phone, password } = this.loginForm.value;

    this.auth.login(phone, password).subscribe({
      next: (user) => {
        this.loading = false;
        this.dialogRef.close();
        this.success.emit();

        // Route based on role
        if (user.role === 'admin' || user.role === 'employee') {
          this.router.navigate(['/dashboard', 'admin']);
        } else if (user.role === 'user') {
          this.router.navigate(['/dashboard', 'user']);
        } else {
          // Fallback for any unexpected role
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.serverError = err.error?.detail || 'Login failed. Please try again.';
      }
    });
  }

  onRegisterClick() {
    this.dialogRef.close();
    this.register.emit();
  }

  onForgotClick() {
    this.dialogRef.close();
    this.forgot.emit();
  }
}
