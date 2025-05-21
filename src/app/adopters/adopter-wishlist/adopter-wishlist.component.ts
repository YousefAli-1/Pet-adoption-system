import { Component, OnInit, signal, computed,inject,effect } from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';
import { AdoptersService } from '../adopters.services';
@Component({
  selector: 'app-adopter-wishlist',
  imports: [MatPaginatorModule,RouterLink],
  templateUrl: './adopter-wishlist.component.html',
  styleUrl: './adopter-wishlist.component.scss'
})
export class AdopterWishlistComponent  implements OnInit {

  ngOnInit(): void {
    this.filterPets(this.selectedType);
  }
  selectedType: string = 'all';
  query = signal<string>('');
  private postsService = inject(PostsService);
  private adoptersService=inject(AdoptersService);
  private route = inject(ActivatedRoute);
  pets = this.postsService.filteredPostsSignal;
  filteredPets = this.postsService.filteredPostsSignal;
  userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '' | null;
  loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');
  constructor() {
   
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
    console.log(this.selectedType);
    if (type === 'all') {
      this.getWishlistPets();
    }else if (type === 'Requested') {
    this.getRequestedPets();
    }else if(type=="Newly Born"){
       this.getWishlistPets();
      const filtered = this.pets().filter(pets =>
        pets.age<5
      );
      this.pets.set(filtered);
    }  else {
      this.getWishlistPets();
      const filtered =this.pets().filter(pet =>
        pet.category === type
      );
      this.pets.set(filtered);
    }
  }
  Request(petId: number) {
    this.postsService.requestAdoption(petId);
    this.adoptersService.trigger('The pet is now waiting for your visit!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');
    this.filterPets(this.selectedType);
  }
  isRequested(petId: number): boolean {
    return this.loggedInUser?.requestedPets?.includes(petId) || this.postsService.isPetRequested(petId);
  }
  cancelRequest(petId: number) {
    const currentAdopterEmail = this.loggedInUser.email;
    
    this.postsService.cancelAdoptionRequest(petId);
    this.pets.set(this.postsService.getAllPosts());
    const hasOtherRequests = this.postsService.isPetRequestedByOthers(petId, currentAdopterEmail);
    const pet = this.pets().find(p => p.ID === petId);
    if (pet) {
      pet.status = hasOtherRequests ? 'WaitingForAVisit' : 'WaitingForAdoption';
    }
    
    this.adoptersService.trigger('The pet is no longer waiting for your visit!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');

    this.filterPets(this.selectedType);
  }
  getRequestCount(petId: number): number {
    return this.postsService.getRequestCount(petId);
  }
  getWishlistPets() {
    const loggedInUser = this.adoptersService.getLoggedInAdopterSignal(); 
    const SavedPets = loggedInUser.savedPets || [];
    this.pets.set(SavedPets);
  }
  getRequestedPets() {
    const loggedInUser = this.adoptersService.getLoggedInAdopterSignal(); 
    const requestedPets = loggedInUser.requestedPets || [];
    this.pets.set(requestedPets);
  }
  save(petId:number){
    this.postsService.savePet(petId);
    this.adoptersService.trigger('The pet is now saved! you can now see it in your wishlist');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"savedPets":[]}');
    this.filterPets(this.selectedType);
  }
  unSave(petId:number){
    this.postsService.unsavePet(petId);
    this.adoptersService.triggerError('The pet is now removed from your wishlist!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"savedPets":[]}');
    this.filterPets(this.selectedType);
  }
  isInWishlist(petId: number): boolean {
    return this.loggedInUser?.requestedPets?.includes(petId) || this.postsService.isPetSaved(petId);
  }
}