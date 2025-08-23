// src/app/shared/confirm-dialog/confirm-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmDialogData {
  iconClass?: string;
  iconBgClass?: string;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="flex flex-col items-center text-center gap-y-2 p-8 bg-[var(--color-secondary)]">
      <div class="rounded-full {{ data.iconBgClass || 'bg-yellow-400' }} p-4">
        <i class="fa {{ data.iconClass || 'fa-exclamation-triangle' }} text-white fa-lg" aria-hidden="true"></i>
      </div>
      <p class="text-2xl font-semibold text-gray-700 mt-3">{{ data.title || 'Confirm' }}</p>

      <p class="text-gray-500 text-base">{{ data.message }}</p>

      <div class="flex flex-col items-center text-center gap-y-2 mt-3 w-full">
        <button type="button" class="w-full py-3 px-4 text-sm font-medium rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-elevated)] cursor-pointer" [mat-dialog-close]="true">
          {{ data.confirmText || 'OK' }}
        </button>
        <button type="button" class="w-full py-3 px-4 text-sm font-medium rounded-lg bg-white text-black border border-gray-300 hover:bg-neutral-100 cursor-pointer" mat-dialog-close="false">
          {{ data.cancelText || 'Cancel' }}
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule]
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}
}
