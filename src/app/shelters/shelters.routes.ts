import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SheltersComponent } from "./shelters.component";

export const routes: Routes=[
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    }
];