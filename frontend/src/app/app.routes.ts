import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './shared/models/components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    // Wildcard fallback
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
