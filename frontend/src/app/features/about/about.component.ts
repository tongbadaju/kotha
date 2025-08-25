import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../../core/services/public.service';
import { TeamMember } from '../../core/models/team-member.model';
import { HttpClient } from '@angular/common/http';

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
  markdownContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private publicService: PublicService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section') || 'company';

      if (['terms-and-conditions', 'privacy-policy', 'about-company'].includes(this.section)) {
        this.loadMarkdown(this.section); 
      }

      if (this.section === 'team') {
        this.loadTeamMembers();
      }
    });
  }

  loadTeamMembers(): void {
    this.publicService.getTeamMembers().subscribe({
      next: (members) => {
        this.teamMembers = members;
      },
      error: (err) => {
        console.error('Failed to load team members:', err);
      }
    });
  }

  loadMarkdown(page: string): void {
    console.log(page)
    this.http.get(`assets/markdown/${page}.md`, { responseType: 'text' })
      .subscribe({
        next: data => {this.markdownContent = data; console.log(data)},
        error: () => this.markdownContent = '*Content not available.*'
      });
  }
}
