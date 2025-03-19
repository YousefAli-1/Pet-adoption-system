import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { SettingsComponent } from "./settings/settings/settings.component";
import { SheltersComponent } from "../../shelters/shelters.component";


export const routes : Routes = [
{
    path:'',
    redirectTo: '/dashboard',
    pathMatch:'full'
},
{
    path:'dashboard',
    component: DashboardComponent
},
{
    path:'settings',
    component:SettingsComponent
},
{
    path:'shelters',
    component:SheltersComponent
}

];