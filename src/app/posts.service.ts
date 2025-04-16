import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { PostType } from './shelters/shelters.model';
import { posts } from './dummy-posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService implements OnInit, OnDestroy {
  allPosts!: PostType[];

  ngOnInit(): void {
    const allPostsJson = localStorage.getItem('allPosts');

    if (allPostsJson) {
      this.allPosts = JSON.parse(allPostsJson);
      return;
    }

    this.allPosts = posts;
  }

  getPostsById(postId: number){
    return this.allPosts.find((post)=>post.ID===postId);
  }

  ngOnDestroy(): void {
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts));
  }
}
