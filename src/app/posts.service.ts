import { computed, inject, Injectable, signal } from '@angular/core';
import { PostStatusType, PostType } from './shelters/shelters.model';
import { Adopter } from './adopters/adopters.model';
import { posts } from './dummy-posts';
import { SheltersService } from './shelters/shelters.service';
import { AdoptersService } from './adopters/adopters.services';

type addPostFormGroupType = Partial<{
  image: string | null;
  category: string | null;
  species: string | null;
  age: number | null;
  location: string | null;
}>;

type editPostFormGroupType = Partial<{
  image: string | null;
  category: string | null;
  species: string | null;
  age: number | null;
  location: string | null;
  status: string | null;
}>;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private sheltersService = inject(SheltersService);
  private adopterService = inject(AdoptersService);
  private allPosts = signal<PostType[]>([]);
  filteredPostsSignal = signal<PostType[]>([]);
  filteredPosts = this.filteredPostsSignal.asReadonly();
  constructor() {
    const allPostsJson = localStorage.getItem('allPosts');

    if (allPostsJson) {
      this.allPosts.set(JSON.parse(allPostsJson));
      return;
    }

    this.allPosts.set(posts);
  }

  getPostsById(postId: number) {
    return this.allPosts().find((post) => post.ID === postId);
  }

  addPost(newPost: addPostFormGroupType, shelterEmail: string) {
    const newPostData: PostType = {
      ID: ((this.allPosts().at(-1)?.ID || 0) + 1),
      imgName: newPost.image || '',
      category: newPost.category || '',
      species: newPost.species || '',
      age: newPost.age || 0,
      location: newPost.location || '',
      shelterEmail: shelterEmail,
      status: 'WaitingForAdoption',
    };

    this.allPosts.update((posts) => [...posts, newPostData]);
    this.updateLocalStorage();
  }

  editPost(editedPost: editPostFormGroupType, oldPost: PostType) {
    const editedPostData: PostType = {
      ID: oldPost.ID,
      imgName: editedPost.image || oldPost.imgName,
      category: editedPost.category || oldPost.category,
      species: editedPost.species || oldPost.species,
      age: editedPost.age || oldPost.age,
      location: editedPost.location || oldPost.location,
      shelterEmail: oldPost.shelterEmail,
      status: (editedPost.status as PostStatusType) || oldPost.status,
    };

    this.allPosts.set(
      this.allPosts().flatMap((post) => {
        if (post.ID !== editedPostData.ID) {
          return post;
        }

        return editedPostData;
      })
    );

    this.updateLocalStorage();
    return editedPostData;
  }

  private updateShelterStates(postId: number) {
    var petsStates = this.sheltersService.loggedInShelter().statusCount;
    const oldStatus = this.allPosts().find((post) => post.ID === postId)?.status as PostStatusType;

    switch (oldStatus) {
      case 'Adopted':
        petsStates = { ...petsStates, adoptedCount: petsStates.adoptedCount - 1 }
        break;
      case 'WaitingForAVisit':
        petsStates = { ...petsStates, waitingForAVisitCount: petsStates.waitingForAVisitCount - 1 }
        break;
      case 'Returned':
        petsStates = { ...petsStates, returnedCount: petsStates.returnedCount - 1 }
        break;
      case 'WaitingForAdoption':
        petsStates = { ...petsStates, waitingForAdoptionCount: petsStates.waitingForAdoptionCount - 1 }
        break;
    }

    this.sheltersService.editPetsStates(petsStates);
  }

  deletePost(postId: number) {
    this.updateShelterStates(postId);

    this.allPosts.set(this.allPosts().filter((post) => post.ID !== postId));

    this.updateLocalStorage();
  }

  getAllShelterPosts(email: string) {
    return computed(() =>
      this.allPosts().filter((post) => post.shelterEmail === email)
    );
  }

  getlatestShelterPosts(email: string, numOfPosts: number) {
    return computed(() => {
      const allShelterPosts = this.getAllShelterPosts(email);
      return allShelterPosts().slice(
        Math.max(allShelterPosts().length - numOfPosts, 0),
        allShelterPosts().length
      )
    }
    );
  }

  updateLocalStorage(): void {
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts()));
  }
  
  getAllPosts(): PostType[] {
    return this.allPosts();
  }

  getPostsByStatus(status: PostStatusType): PostType[] {
    return this.allPosts().filter(post => post.status === status);
  }

  getPostsBySpecies(species: string): PostType[] {
    return this.allPosts().filter(post => post.species.toLowerCase() === species.toLowerCase());
  }

  getPostById(id: number): PostType | undefined {
    return this.allPosts().find(post => post.ID === id);
  }

  searchPosts(searchTerm: string): string {
    this.allPosts.set(this.getAllPosts());
    if (!searchTerm) {
      this.filteredPostsSignal.set(this.allPosts());
      return 'all';
    }
  
    const term = searchTerm.toLowerCase();
    const filtered = this.allPosts().filter(post =>
      post.species.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      post.location.toLowerCase().includes(term)
    );
  
    this.filteredPostsSignal.set(filtered);
    
    if (filtered.length > 0) {
      const firstCategory = filtered[0].category;
      const allSameCategory = filtered.every(post => post.category === firstCategory);
      
      if (allSameCategory) {
        return firstCategory; 
      }
    }
    
    return 'all'; 
  }

  savePet(postId: number): void {
    if (!this.adopterService.isLoggedIn()) return;

    const currentAdopter = this.adopterService.getLoggedInAdopterSignal()!;
    const post=this.getPostById(postId);

    if (post &&!currentAdopter.savedPets.includes(post)) {
      currentAdopter.savedPets.push(post);
      this.adopterService.updateLoggedInAdopter(currentAdopter);
    }
    this.updateLocalStorage();
  }

  unsavePet(postId: number): void {
    if (!this.adopterService.isLoggedIn()) return;
    const currentAdopter = this.adopterService.loggedInAdopterSignal()!;
    currentAdopter.savedPets = currentAdopter.savedPets.filter(post => post.ID !== postId);
    this.adopterService.updateLoggedInAdopter(currentAdopter);
  }

  requestAdoption(postId: number): void {
    if (!this.adopterService.isLoggedIn()) return;

    const currentAdopter = this.adopterService.loggedInAdopterSignal()!;

    const post = this.getPostById(postId);
    if (post && post.status === 'Returned') {
      post.wasReturned = true; 
    }
    if (post && !currentAdopter.requestedPets.includes(post)) {
      currentAdopter.requestedPets.push(post);
      this.adopterService.updateLoggedInAdopter(currentAdopter);
      post.status = 'WaitingForAVisit';
    }
    this.updateLocalStorage();
  }

  cancelAdoptionRequest(postId: number): void {
    if (!this.adopterService.isLoggedIn()) return;
    const currentAdopter = this.adopterService.loggedInAdopterSignal()!;
    currentAdopter.requestedPets = currentAdopter.requestedPets.filter(post => post.ID !== postId);
    this.adopterService.updateLoggedInAdopter(currentAdopter);
  }
  isPetRequestedByOthers(petId: number, currentAdopterEmail: string): boolean {
    const adopters = JSON.parse(localStorage.getItem('allAdopters') || '[]');
    
    
    return adopters.some((adopter: Adopter) => 
      adopter.email !== currentAdopterEmail && 
      adopter.requestedPets.some(pet => pet.ID === petId)
    );
  }
  getRequestCount(petId: number): number {
    const adopters = JSON.parse(localStorage.getItem('allAdopters') || '[]');
    
    return adopters.filter((adopter:Adopter) => 
      adopter.requestedPets.some(pet => pet.ID === petId)
    ).length;
  }
  isPetSaved(postId: number): boolean {
    const adopter = this.adopterService.loggedInAdopter();
    if (!adopter) return false;
    
    return adopter.savedPets.some(post => post.ID === postId);
  }

  isPetRequested(postId: number): boolean {
    const adopter = this.adopterService.loggedInAdopter();
    if (!adopter) return false;
    
    return adopter.requestedPets.some(post => post.ID === postId);
  }
  getCategoryList(): string[] {
    const categorySet = new Set<string>();
    for (const post of this.allPosts()) {
      if (post.status === 'WaitingForAdoption') {
        categorySet.add(post.category);
      }
    }
    return Array.from(categorySet).slice(0, 5); // Get first 5 species
  }
}
