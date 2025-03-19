import { Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes'
import {routes as adopterRoutes} from './adopters/adopters.routes'
import { SheltersComponent } from './shelters/shelters.component';
import { AdoptersComponent } from './adopters/adopters.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
export const routes: Routes = [
    {
        path:'shelter',
        component: SheltersComponent,
        children: shelterRoutes
    },{
        path:'adopter',
        component: AdoptersComponent,
        children: adopterRoutes
    },{
        path:'login',
        component:LoginComponent
    },{
        path:'signup',
        component:SignupComponent
    },{
        path:'',
        component:LandingPageComponent
    },{
        path:'404',
        component:NotFoundComponent
    },{
        path:'unauth',
        component:UnauthorizedComponent
    }
];
