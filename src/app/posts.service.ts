import { Injectable } from '@angular/core';
import { PostType } from './shelters/shelters.model';
import { posts } from './dummy-posts';

type addPostFormGroupType = Partial<{
  image: string | null;
  category: string | null;
  species: string | null;
  age: number | null;
  location: string[] | null;
}>;

type editPostFormGroupType = Partial<{
  image: string | null;
  category: string | null;
  species: string | null;
  age: number | null;
  location: string[] | null;
  status: string | null;
}>;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  allPosts!: PostType[];

  constructor() {
    const allPostsJson = localStorage.getItem('allPosts');

    if (allPostsJson) {
      this.allPosts = JSON.parse(allPostsJson);
      return;
    }

    this.allPosts = posts;
  }

  getPostsById(postId: number) {
    return this.allPosts.find((post) => post.ID === postId);
  }

  addPost(newPost: addPostFormGroupType) {}

  editPost(editedPostData: editPostFormGroupType) {}

  updateLocalStorage(): void {
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts));
  }
}
