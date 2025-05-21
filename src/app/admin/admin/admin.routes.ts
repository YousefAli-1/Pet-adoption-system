import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard/dashboard.component";
import { AdminSettingsComponent } from "./settings/settings/settings.component";
import { SettingsEditComponent } from "./settings/settings/settings-edit/settings-edit.component";
import { ManageAdoptersComponent } from "./manage-adopters/manage-adopters.component";
import { ManageSheltersComponent } from "./manage-shelters/manage-shelters.component";
import { ManagePetsComponent } from "./manage-pets/manage-pets.component";

export const routes : Routes = [
{
    path:'',
    redirectTo: '/dashboard',
    pathMatch:'full'
},{
    path:'dashboard',
    component: DashboardComponent
},{
    path:'settings',
    component:AdminSettingsComponent
},{
    path:'shelters',
    component:ManageSheltersComponent
},{
    path:'adopters',
    component:ManageAdoptersComponent
},{
    path:'pets',
    component:ManagePetsComponent
},{
    path:'settings/settings-edit',
    component:SettingsEditComponent
}

];