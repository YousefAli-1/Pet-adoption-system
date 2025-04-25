import { CanActivateFn, RedirectCommand, Router, Routes } from '@angular/router';
import {routes as shelterRoutes} from './shelters/shelters.routes';
import {routes as adopterRoutes} from './adopters/adopters.routes';
import {routes as adminRoutes} from './admin/admin/admin.routes';
import { SheltersComponent } from './shelters/shelters.component';
import { AdoptersComponent } from './adopters/adopters.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';
import { UnauthorizedComponent } from './auth/unauthorized/unauthorized.component';  
import { AdminComponent } from './admin/admin/admin.component';
import { inject } from '@angular/core';
import { SheltersService } from './shelters/shelters.service';
import { AboutusComponent } from './aboutus/aboutus.component';

const sheltersAuthGuard: CanActivateFn = () => {
    const sheltersService= inject(SheltersService);
    const router = inject(Router);
    
    if (sheltersService.isShelterLoggedIn() ) {
      return true;
    }
    return router.navigateByUrl('/unauth');
};

export const routes: Routes = [
    {
        path:'shelter',
        component: SheltersComponent,
        children: shelterRoutes,
        canActivateChild: [sheltersAuthGuard]
    },{
        path:'adopter',
        component: AdoptersComponent,
        children: adopterRoutes
    },{
        path:'login',
        component:LoginComponent,
        canActivate: [(route: any, state: any) => {
            const userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '' | null;
            console.log(userType);
            if (userType== null || userType=='') {
                return true;
            }
            return new RedirectCommand(inject(Router).parseUrl("/unauth")) ;
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
