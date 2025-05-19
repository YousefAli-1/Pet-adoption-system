import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AdopterSettingsComponent } from "./adopter-settings/adopter-settings.component";
import { AdopterProfileComponent } from "./adopter-profile/adopter-profile.component";
import { PetsComponent } from "./pets/pets.component";
import { AdopterWishlistComponent } from "./adopter-wishlist/adopter-wishlist.component";
export const routes: Routes=[
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'profile',
        component: AdopterProfileComponent
    },{
        path:'settings',
        component:AdopterSettingsComponent
    },{
        path:'pets',
        component:PetsComponent
    },{
      path:'wishlist',
      component:AdopterWishlistComponent
    }

];