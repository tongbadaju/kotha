import { Component } from '@angular/core';
import { PublicService } from '../../../../core/services/public.service';
import { CommonModule, DatePipe } from '@angular/common';
import { Property } from '../../../../core/models/property.model';
import { LabelifyPipe } from '../../../../shared/pipes/labelify.pipe';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPropertyComponent } from '../../shared/add-property/add-property.component';

@Component({
  selector: 'app-properties',
  imports: [CommonModule, LabelifyPipe],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent {
  propertyList: Property[] = [];
  paginatedList: Property[] = [];
  isLoading = true;
  error: string | null = null;

  pageSize = 5;
  currentPage = 0;
  showAll = false;

  constructor(
    private publicService: PublicService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.publicService.getProperties().subscribe({
      next: (data: Property[]) => {
        this.propertyList = data;
        console.log(this.propertyList)
        this.updatePaginatedList();
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load properties';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  toggleAvailability(property: Property): void {
    this.publicService.toggleAvailability(property.id!).subscribe({
      next: (res) => {
        property.isAvailable = res.isAvailable;
      },
      error: (err) => {
        console.error('Failed to toggle availability', err);
      },
    });
  }

  updatePaginatedList(): void {
    if (this.showAll) {
      this.paginatedList = this.propertyList;
    } else {
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedList = this.propertyList.slice(start, end);
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.propertyList.length) {
      this.currentPage++;
      this.updatePaginatedList();
    }
  }

  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedList();
    }
  }

  toggleView(): void {
    this.showAll = !this.showAll;
    this.currentPage = 0; 
    this.updatePaginatedList();
  }

  openAddPropertyDialog(): void {
    this.dialog.open(AddPropertyComponent, {
      width: '600px',
      maxHeight: '90vh',
      panelClass: ['rounded-lg', 'overflow-hidden'],
      disableClose: false
    });
  }

  editProperty(property: Property): void {
    console.log('Edit property:', property);
  }

  deleteProperty(id: number): void {
    const data: ConfirmDialogData = {
      title: 'Delete Property',
      message: 'Are you sure you want to delete this property?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    };

    const ref = this.dialog.open(ConfirmDialogComponent, {
      data,
      panelClass: ['rounded-lg', 'overflow-hidden']
    });

    ref.afterClosed().subscribe(confirmed => {
      if (confirmed === true) {
        this.publicService.deleteProperty(id).subscribe({
          next: () => {
            this.propertyList = this.propertyList.filter(p => p.id !== id);
          },
          error: err => {
            console.error('Failed to delete property', err);
          }
        });
      }
    });
  }
}
