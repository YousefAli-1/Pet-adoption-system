import { Component, effect, inject, signal, computed } from '@angular/core';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';
import { Router, RouterLink } from '@angular/router';
import { AdoptersService } from '../adopters.services';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private postsService = inject(PostsService);
  private adoptersService = inject(AdoptersService);
  private router = inject(Router);
  categoryCount = this.postsService.getCategoryList();
  featuredPets = signal<PostType[]>([]);
  allPosts = signal<PostType[]>([]);
  userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '' | null;
  loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');
  constructor() {
    effect(() => {
      const waitingPets = [
        ...this.postsService.getPostsByStatus('WaitingForAdoption'),
        ...this.postsService.getPostsByStatus('WaitingForAVisit'),
        ...this.postsService.getPostsByStatus('Returned')
      ]
      this.allPosts.set(this.postsService.getAllPosts());
      this.featuredPets.set(waitingPets.slice(-5));
    });
  }
    allCategoryData = computed(() => {
      const categoryMap = new Map<string, number>();
      for (const post of this.allPosts()) {
      if ((post.status === 'WaitingForAdoption' || post.status === 'WaitingForAVisit' || post.status === 'Returned') 
          && !this.isRequested(post.ID)) {
        const currentCount = categoryMap.get(post.category) || 0;
        categoryMap.set(post.category, currentCount + 1);
      }
      }

      return Array.from(categoryMap.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([category, count]) => ({
          name: category,
          count,
          description: this.getCategoryDescription(category),
          icon: this.getCategoryIcon(category)
        }));
    });

  totalAvailableAnimals = computed(() => {
    return this.allCategoryData().reduce((sum, category) => sum + category.count, 0);
  });
  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      Dog: '/english-cocker_12893777.gif',
      Cat: '/cat_17092250.gif',
      Bird: '/animals_14822316.gif',
      Rabbit: '/rabbit_12086781.gif',
      Reptile: '/andrias-davidianus_12217712.gif'
    };
    return icons[category] || '/default-icon.gif';
  }
  getCategoryDescription(category: string): string {
    const descriptions: { [key: string]: string } = {
      Dog: "Man's best friend. Loyal and loving companions.",
      Cat: "Independent and curious. Perfect for a cozy home.",
      Bird: "Colorful and chirpy. Great for adding life to your home.",
      Rabbit: "Soft and cuddly. Ideal for gentle and loving owners.",
      Reptile: "Unique and fascinating. Perfect for exotic pet enthusiasts."
    };
    return descriptions[category] || 'Adorable and lovable pets.';
  }
  searchInput = signal<string>('');
  searchError='';
  search() {
    const category = this.postsService.searchPosts(this.searchInput());
        if (!/^[a-zA-Z\s]*$/.test(this.searchInput())) {
      this.searchError = 'Search Input can only contain letters and spaces';
    }else{
    this.searchError = '';
    this.router.navigate(['adopter/pets'], { 
      queryParams: { 
        q: this.searchInput(),
        category: category 
      } 
    });
  }
  }
  showPopup = false;

  Request(petId: number) {
    this.postsService.requestAdoption(petId);
    this.adoptersService.trigger('The pet is now waiting for your visit!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');
    const waitingPets = [
      ...this.postsService.getPostsByStatus('WaitingForAdoption'),
      ...this.postsService.getPostsByStatus('WaitingForAVisit'),
      ...this.postsService.getPostsByStatus('Returned')
    ];
    this.allPosts.set(waitingPets);
  }
  cancelRequest(petId: number) {
    const currentAdopterEmail = this.loggedInUser.email;
    
    this.postsService.cancelAdoptionRequest(petId);
    
    const hasOtherRequests = this.postsService.isPetRequestedByOthers(petId, currentAdopterEmail);
    const pet = this.allPosts().find((p: PostType) => p.ID === petId);
    if (pet) {
      pet.status = hasOtherRequests ? 'WaitingForAVisit' : 'WaitingForAdoption';
    }
    
    this.adoptersService.trigger('The pet is no longer waiting for your visit!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"requestedPets":[]}');

  }
  getRequestCount(petId: number): number {
    return this.postsService.getRequestCount(petId);
  }
  isRequested(petId: number): boolean {
    return this.loggedInUser?.requestedPets?.includes(petId) || this.postsService.isPetRequested(petId);
  }
  save(petId:number){
    this.postsService.savePet(petId);
    this.adoptersService.trigger('The pet is now saved! you can now see it in your wishlist');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"savedPets":[]}');
  }
  unSave(petId:number){
    this.postsService.unsavePet(petId);
    this.adoptersService.triggerError('The pet is now removed from your wishlist!');
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInAdopter') || '{"savedPets":[]}');
  }
  isInWishlist(petId: number): boolean {
    return this.loggedInUser?.requestedPets?.includes(petId) || this.postsService.isPetSaved(petId);
  }
}
