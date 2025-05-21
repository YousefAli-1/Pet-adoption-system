import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { PostsService } from '../../../posts.service';

@Component({
  selector: 'app-manage-pets',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './manage-pets.component.html',
  styleUrl: './manage-pets.component.scss',
  providers:[PostsService]
})
export class ManagePetsComponent {
  posts: any[] = [];

    constructor(private postsService: PostsService){
      
    }
  ngOnInit() {
    this.postsService.getAllPosts();
    this.loadPosts();
    console.log("ss- ",localStorage.getItem('allPosts'));
  }

  loadPosts() {
    const storedPosts = localStorage.getItem('allPosts');
    this.posts = storedPosts ? JSON.parse(storedPosts) : [];
  }

  savePosts() {
    localStorage.setItem('allPosts', JSON.stringify(this.postsService));
  }
  deletePosts(index: number) {
    this.posts.splice(index, 1);
    this.savePosts();
  }
}
