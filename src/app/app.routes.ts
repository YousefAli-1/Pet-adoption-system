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
import { AdminSettingsUpdate } from './admin/admin/adminSettings.update';
import { AdoptersService } from './adopters/adopters.services';


const sheltersAuthGuard: CanActivateFn = () => {
    const sheltersService= inject(SheltersService);
    const router = inject(Router);
    
    if (sheltersService.isShelterLoggedIn() ) {
      return true;
    }
    return router.navigateByUrl('/unauth');
};
const AdminAuth: CanActivateFn = () => {
    const adminService= inject(AdminSettingsUpdate);
    const router = inject(Router);
    
    if (adminService.isLoggedIn() ) {
      return true;
    }
    return router.navigateByUrl('/unauth');
};
const adoptersAuthGuard: CanActivateFn = () => {
    const adopterService= inject(AdoptersService);
    const router = inject(Router);
    
    if (adopterService.isLoggedIn() ) {
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
        children: adopterRoutes,
        canActivateChild: [adoptersAuthGuard]
    },{
        path:'admin',
        component: AdminComponent,
        children:adminRoutes,
         canActivateChild: [AdminAuth]
    },{
        path:'login',
        component:LoginComponent,
        canActivate: [(route: any, state: any) => {
            const userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | 'admin' | '' | null;
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
            const userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | 'admin' | '';
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
        path:'aboutus',
        component:AboutusComponent
    }

];
