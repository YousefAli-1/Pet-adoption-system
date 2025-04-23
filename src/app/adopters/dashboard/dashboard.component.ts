import { Component, effect,inject,signal,computed } from '@angular/core';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private postsService = inject(PostsService);
  private router = inject(Router);  
  categoryCount = this.postsService.getCategoryList();
  featuredPets = signal<PostType[]>([]);
  allPosts = this.postsService.getAllPosts();
  constructor() {
    effect(() => {
      const waitingPets = this.postsService.getPostsByStatus('WaitingForAdoption');
      this.featuredPets.set(waitingPets.slice(0, 5));
    });
  }
  allCategoryData = computed(() => {
    const categoryMap = new Map<string, number>();
    
    for (const post of this.allPosts) {
      if (post.status === 'WaitingForAdoption') {
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

search() {
  this.postsService.searchPosts(this.searchInput());
  this.router.navigate(['adopter/pets'], { queryParams: { q: this.searchInput() } });
}
}
