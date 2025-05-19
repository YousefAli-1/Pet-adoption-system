import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { AdminSettingsComponent } from "./settings/settings/settings.component";
import { SheltersComponent } from "../../shelters/shelters.component";
import { SettingsEditComponent } from "./settings/settings/settings-edit/settings-edit.component";


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
    component:AdminSettingsComponent
},
{
    path:'shelters',
    component:SheltersComponent
},
{
    path:'settings/settings-edit',
    component:SettingsEditComponent
}

];