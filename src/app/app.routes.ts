import { Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes'
import { SheltersComponent } from './shelters/shelters.component';
export const routes: Routes = [
    {
        path:'shelter',
        component: SheltersComponent,
        children: shelterRoutes
    }
];
