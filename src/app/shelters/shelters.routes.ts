import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { ManagePostsComponent } from "./manage-posts/manage-posts.component";
import { SettingsComponent } from "./settings/settings.component";

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
        path: 'addPost',
        component: AddPostComponent
    },
    {
        path: 'managePosts',
        component: ManagePostsComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];