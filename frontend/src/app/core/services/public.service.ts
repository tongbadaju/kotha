import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { TeamMember } from "../models/team-member.model";
import { Property } from '../models/property.model';
import { User } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})

export class PublicService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // Team
  getTeamMembers(): Observable<TeamMember[]> {
    return this.http.get<TeamMember[]>(`${this.apiUrl}/public/team/`);
  }

  // Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/auth/users/`);
  }

  // Properties
  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/properties/`);
  }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/properties/${id}/`);
  }

  addProperty(property: Partial<Property>): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/properties/`, property);
  }

  updateProperty(id: number, payload: Partial<Property>): Observable<Property> {
    return this.http.patch<Property>(`${this.apiUrl}/properties/${id}/`, payload);
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/properties/${id}/`);
  }

  toggleAvailability(id: number): Observable<{ isAvailable: boolean }> {
    return this.http.patch<{ isAvailable: boolean }>(
      `${this.apiUrl}/properties/${id}/toggle-availability/`,
      {}
    );
  }

}
