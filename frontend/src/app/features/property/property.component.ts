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
  isGridView: boolean = true;
  properties: Property[] = [];

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.loadProperties();
  }

  loadProperties(): void {
    this.publicService.getProperties().subscribe({
      next: (data) => {
        this.properties = data;
      },
      error: (err) => {
        console.error('Error loading properties', err);
      }
    });
  }

  // Sort / Filter / View methods
  openFilter(): void {
    console.log('Filter clicked');
  }

}
