import { Component, OnInit, signal, computed,inject,effect } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';
import { AdoptersService } from '../adopters.services';

@Component({
  selector: 'app-pets',
  imports: [MatPaginatorModule,RouterLink],
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent  {
  selectedType: string = 'all';
  query = signal<string>('');
  private postsService = inject(PostsService);
  private adoptersService=inject(AdoptersService);
  private route = inject(ActivatedRoute);
  pets = this.postsService.filteredPostsSignal;
  userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '' | null;
  loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{}');
  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedType = params['category'];
      }
    });
    console.log(this.loggedInUser);
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
    this.start.set(0);
    this.end.set(4);
  }
  private start=signal<number>(0);
  private end=signal<number>(1);
  posts = computed<PostType[]>(() =>
    this.pets().slice(this.start(), this.end()).reverse()
  );
  pageChange(event: PageEvent) {
    const startIndex = event.pageIndex * 4;
    this.start.set(startIndex);
    this.end.set(startIndex + 4);
  }
  filterPets(type: string): void {
    this.selectedType = type;
    if (type === 'all') {
      this.pets.set(this.postsService.getAllPosts());
    } else {
      this.pets.set(this.postsService.getAllPosts());
      const filtered = this.pets().filter(pets =>
        pets.category=== type
      );
      this.pets.set(filtered);
    }
  }
  Request(petId: number) {
    this.postsService.requestAdoption(petId);
    this.adoptersService.trigger('The pet is now waiting for your visit!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{}');
    this.pets.set(this.postsService.getAllPosts());
    if (this.selectedType === 'all') {
      this.pets.set(this.postsService.getAllPosts());
    } else {
      this.pets.set(this.postsService.getAllPosts());
      const filtered=this.pets().filter(pet => pet.category === this.selectedType);
      this.pets.set(filtered);
    }
  }
}
