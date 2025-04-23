import { Component, OnInit, signal, computed,inject,effect } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';

@Component({
  selector: 'app-pets',
  imports: [MatPaginatorModule],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent  {
  query = signal<string>('');
  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);
  pets = this.postsService.filteredPostsSignal;
  constructor() {
    this.route.queryParams.subscribe(params => {
      this.query.set((params['q'] || '').toLowerCase());
    });
  
    effect(() => {
      const q = this.query();
      if (q) {
        this.postsService.searchPosts(q);
      } else {
        this.pets.set(this.postsService.getAllPosts());
      }
    });
  }
  private start=signal<number>(0);
  private end=signal<number>(1);
  posts= computed<PostType[]>(()=>this.pets().slice(this.start(),this.end()).reverse());
  pageChange(event: PageEvent){
    this.start.set(Math.max(event.pageIndex*10-1,0));
    this.end.set(this.start()+1);
  }
}
