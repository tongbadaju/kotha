import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { PageNotFoundComponent } from './shared/models/components/page-not-found/page-not-found.component';
import { AboutComponent } from './features/about/about.component';
import { PropertyComponent } from './features/property/property.component';
import { DetailComponent } from './features/property/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },

    {
        path: 'about/:section',
        component: AboutComponent,
        
    },

    {
        path: 'property',
        children: [
        {
            path: 'all',
            component: PropertyComponent, // list view
        },
        {
            path: ':id',
            component: DetailComponent, // detail view
        },
        ],
    },

    // Wildcard fallback
    {
        path: '**',
        component: PageNotFoundComponent
    }
];
