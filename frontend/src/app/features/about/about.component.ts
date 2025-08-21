import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../core/services/public.service';
import { TeamMember } from '../../core/models/team-member.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  section: string = '';
  teamMembers: TeamMember[] = [];

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section') || 'company';
    });

    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.publicService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
        console.log('Team members loaded:', this.teamMembers);
      },
      error: (err) => {
        console.error('Failed to load team members:', err);
      }
    });
  }
}
