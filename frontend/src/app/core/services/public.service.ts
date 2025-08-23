import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { TeamMember } from "../models/team-member.model";
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})

export class PublicService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/public/team/`);
  }
 

  //Property 

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}/`);
  }

}
