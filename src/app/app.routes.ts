import { Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes'
import { SheltersComponent } from './shelters/shelters.component';
import { routes as adminRoutes } from './admin/admin/admin.routes'
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
    {
        path:'shelter',
        component: SheltersComponent,
        children: shelterRoutes
    },
    { 
        path:'admin',
        component: AdminComponent,
        children: adminRoutes
    }
];
