import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @Output() back = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  registerForm: FormGroup;
  submitted = false;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        phone: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[6-9]\d{9}$/),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  get rf() {
    return this.registerForm.controls;
  }

  /** Group-level validator: checks password === confirmPassword */
  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pwd = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return pwd === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    this.submitted = true;
    this.serverError = null;

    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    const { fullName, phone, password } = this.registerForm.value;

    this.auth.register(fullName, phone, password).subscribe({
      next: () => {
        this.loading = false;
        const data: ConfirmDialogData = {
          iconBgClass: 'bg-green-300',
          iconClass: 'fa-check',
          title: 'Registered',
          message: 'Successfully registered. Please login to continue.',
          confirmText: 'Next',
          cancelText: 'Cancel'
        };
    
        const ref = this.dialog.open(ConfirmDialogComponent, { data });
    
        ref.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.success.emit();
          }
        });
      },
      error: err => {
        this.loading = false;
        this.serverError = err.error?.detail || 'Registration failed. Please try again.';
      }
    });
  }

  onBack(event: Event) {
    event.preventDefault();
    this.back.emit();
  }
}
