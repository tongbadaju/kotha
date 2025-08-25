import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicService } from '../../core/services/public.service';
import { Property } from '../../core/models/property.model';

@Component({
  selector: 'app-property',
  imports: [CommonModule, RouterModule,],
  templateUrl: './property.component.html',
  styleUrl: './property.component.scss'
})
export class PropertyComponent implements OnInit {
  allProperties: Property[] = [];
  visibleProperties: Property[] = [];
  visibleCount = 12;

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.publicService.getProperties().subscribe({
      next: (data) => {
        this.allProperties = data;
        this.updateVisibleProperties();
      },
      error: (err) => {
        console.error('Error loading properties', err);
      }
    });
  }

  updateVisibleProperties(): void {
    this.visibleProperties = this.allProperties.slice(0, this.visibleCount);
  }

  viewMore(): void {
    this.visibleCount += 12;
    this.updateVisibleProperties();
  }

  openFilter(): void {
    console.log('Filter clicked');
  }
}
