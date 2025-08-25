export interface Account {
  id: number;
  name: string;
  phoneNumber: string;
  role: 'admin' | 'employee' | 'user'; 
}

export interface LoginResponse {
  access: string;
  refresh: string;
  user: Account;
}

export interface TokenRefreshResponse {
  access: string;
  refresh?: string;
}

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  lastLogin: string;
  role: 'user' | 'employee' | 'admin';
}
