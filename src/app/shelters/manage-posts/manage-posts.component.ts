import { Component, computed, inject, signal } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { PostType } from '../shelters.model';
import { ShelterPostComponent } from "./shelter-post/shelter-post.component";
import { CardComponent } from "../shared/card/card.component";
import { SheltersService } from '../shelters.service';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-manage-posts',
  imports: [MatPaginatorModule, ShelterPostComponent, CardComponent],
  templateUrl: './manage-posts.component.html',
  styleUrl: './manage-posts.component.scss'
})
export class ManagePostsComponent {
  private sheltersService=inject(SheltersService);
  private postsService= inject(PostsService);

  private start=signal<number>(0);
  private end=signal<number>(9);

  allPosts= this.postsService.getAllShelterPosts(this.sheltersService.loggedInShelter().email);

  posts= computed<PostType[]>(()=>this.allPosts().slice(this.start(),this.end()).reverse());
  pageChange(event: PageEvent){
    this.start.set(Math.max(event.pageIndex*10-1,0));
    this.end.set(this.start()+9);
  }
}
