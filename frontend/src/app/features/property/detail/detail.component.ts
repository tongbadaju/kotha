import { Component } from '@angular/core';
import { Property } from '../../../core/models/property.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PublicService } from '../../../core/services/public.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  property!: Property;

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.publicService.getProperty(+id).subscribe((data) => {
        this.property = data;
        console.log('Property details:', this.property);
      });
    }
  }
}
