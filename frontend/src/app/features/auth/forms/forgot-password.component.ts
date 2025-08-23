import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  @Output() back    = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  forgotForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
  }

  get ff() { return this.forgotForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      return;
    }
    // … call AuthService.resetPassword() …
    this.success.emit();
  }

  onBack(event: Event) {
    event.preventDefault()
    this.back.emit();
  }
}
