import { RedirectCommand, Router, Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes';
import {routes as adopterRoutes} from './adopters/adopters.routes';
import {routes as adminRoutes} from './admin/admin/admin.routes';
import { SheltersComponent } from './shelters/shelters.component';
import { AdoptersComponent } from './adopters/adopters.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';  
import { AdminComponent } from './admin/admin/admin.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { inject } from '@angular/core';



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
        component:LoginComponent,
        canActivate: [(route: any, state: any) => {
            const userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '';
            console.log(userType);
            if (userType!== '') {
                return new RedirectCommand(inject(Router).parseUrl("/unauth")) ;
            }
            return true;
        }]
    },{
        path:'signup',
        component:SignupComponent,
        canActivate: [(route: any, state: any) => {
            const userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '';
            if (userType!== '') {
                return new RedirectCommand(inject(Router).parseUrl("/unauth")) ;
            }
            return true;
        }]
    },{
        path:'',
        component:LandingPageComponent
    },{
        path:'404',
        component:NotFoundComponent
    },{
        path:'unauth',
        component:UnauthorizedComponent
    },{
        path:'admin',
        component:AdminComponent,
        children:adminRoutes
    },{
        path:'aboutus',
        component:AboutusComponent
    }

];
