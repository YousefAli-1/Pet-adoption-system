import { Component, computed, signal } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { PostType } from '../shelters.model';
import { posts } from '../dashboard/shelter-latest-posts/dummy-posts';
import { ShelterPostComponent } from "./shelter-post/shelter-post.component";
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-manage-posts',
  imports: [MatPaginatorModule, ShelterPostComponent, CardComponent],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.scss'
})
export class ManagePostsComponent {
  allPosts= signal<PostType[]>(posts);

  posts= signal<PostType[]>(this.allPosts().slice(0,9));
  pageChange(event: PageEvent){
    const start=Math.max(event.pageIndex*10-1,0);
    const end=start+9;
    this.posts.set(this.allPosts().slice(start,end));
  }
}
