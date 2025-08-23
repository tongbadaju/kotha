// role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.auth.currentUser;
    const allowedRoles: string[] = route.data['roles'];
    
    if (user && allowedRoles.includes(user.role)) {
      return true;
    }

    // Redirect to “not authorized” or home
    this.router.navigate(['/403']);
    return false;
  }
}
