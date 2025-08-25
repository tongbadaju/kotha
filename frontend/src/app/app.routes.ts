import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';
import { AboutComponent } from './features/about/about.component';
import { PropertyComponent } from './features/property/property.component';
import { DetailComponent } from './features/property/detail/detail.component';

import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [

    // Home
    { path: '', component: HomeComponent },

    // Property listing & detail
    {
        path: 'property',
        children: [
        { path: 'all', component: PropertyComponent },
        { path: ':id', component: DetailComponent },
        ],
    },


    // Dashboards
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        children: [
        {
            path: 'user',
            canActivate: [RoleGuard],
            data: { roles: ['user'] },
            loadComponent: () =>
            import('./features/dashboard/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent),
        },
        {
            path: 'admin',
            canActivate: [RoleGuard],
            data: { roles: ['employee', 'admin'] },
            loadComponent: () =>
            import('./features/dashboard/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
            children: [ 
                {
                    path: 'home',
                    loadComponent: () =>
                    import('./features/dashboard/admin-dashboard/home/home.component').then(m => m.HomeComponent),
                },
                {
                    path: 'users',
                    loadComponent: () =>
                    import('./features/dashboard/admin-dashboard/users/users.component').then(m => m.UsersComponent),
                },
                {
                    path: 'properties',
                    loadComponent: () =>
                    import('./features/dashboard/admin-dashboard/properties/properties.component').then(m => m.PropertiesComponent),
                },
                {
                    path: '',
                    redirectTo: 'home',
                    pathMatch: 'full',
                },
            ],
        },
        { path: '', redirectTo: 'user', pathMatch: 'full' }
        ]
    },

    // About pages
    { path: 'about/:section', component: AboutComponent },

    // Wildcard fallback
    { path: '403', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];
