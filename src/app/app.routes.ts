import { Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes'
import {routes as adopterRoutes} from './adopters/adopters.routes'
import { SheltersComponent } from './shelters/shelters.component';
import { AdoptersComponent } from './adopters/adopters.component';
export const routes: Routes = [
    {
        path:'shelter',
        component: SheltersComponent,
        children: shelterRoutes
    },{
        path:'adopter',
        component: AdoptersComponent,
        children: adopterRoutes
    }
];
