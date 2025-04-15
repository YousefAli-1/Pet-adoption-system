import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Router, RouterStateSnapshot, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { ManagePostsComponent } from "./manage-posts/manage-posts.component";
import { SettingsComponent } from "./settings/settings.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
import { PostType } from "./shelters.model";
import { inject } from "@angular/core";

type ResolveFn<T> = (  route: ActivatedRouteSnapshot,  state: RouterStateSnapshot) => MaybeAsync<T | RedirectCommand>
const PostResolver: ResolveFn<PostType>=(route)=>{
    console.log(route.paramMap.get('postId'));
    return new RedirectCommand(inject(Router).parseUrl('/error404'));
};

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
        path: 'editPost/:postId',
        component: EditPostComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];