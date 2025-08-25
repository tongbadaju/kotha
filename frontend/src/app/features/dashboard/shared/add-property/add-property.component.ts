import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from '../../../../core/services/public.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-property',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.scss'
})
export class AddPropertyComponent {
  propertyForm!: FormGroup;
  submitted = false;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      propertyType: ['', Validators.required],
      description: [''],
      district: ['', Validators.required],
      area: ['', Validators.required],
      address: ['', Validators.required],
      bedrooms: [0, [Validators.required, Validators.min(0)]],
      bathrooms: [0, [Validators.required, Validators.min(0)]],
      kitchen: [0, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      availableFrom: [''],
      genderPreference: ['unisex', Validators.required],
      terms: [false, Validators.requiredTrue]
    });
  }

  get pf() {
    return this.propertyForm.controls;
  }

  onSubmit(): void {
    if (this.propertyForm.invalid) return;

    const payload = this.propertyForm.value;

    // Backend will infer uploadedBy from token
    this.publicService.addProperty(payload).subscribe({
      next: () => console.log('Property added successfully'),
      error: (err) => console.error('Error adding property', err)
    });
  }
}
