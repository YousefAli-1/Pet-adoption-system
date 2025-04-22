import { Component, effect,inject,signal,computed } from '@angular/core';
import { PostsService } from '../../posts.service';
import { PostType } from '../../shelters/shelters.model';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private postsService = inject(PostsService);

  speciesCount = this.postsService.getSpeciesList();
  featuredPets = signal<PostType[]>([]);
  allPosts = this.postsService.getAllPosts();
  constructor() {
    effect(() => {
      const waitingPets = this.postsService.getPostsByStatus('WaitingForAdoption');
      this.featuredPets.set(waitingPets.slice(0, 5));
    });
  }
  allSpeciesData = computed(() => {
    const speciesMap = new Map<string, number>();
    
    for (const post of this.allPosts) {
      if (post.status === 'WaitingForAdoption') {
        const currentCount = speciesMap.get(post.species) || 0;
        speciesMap.set(post.species, currentCount + 1);
      }
    }
    
    return Array.from(speciesMap.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([species, count]) => ({
        name: species,
        count,
        description: this.getSpeciesDescription(species),
        icon: this.getSpeciesIcon(species)
      }));
  });

  totalAvailableAnimals = computed(() => {
    return this.allSpeciesData().reduce((sum, species) => sum + species.count, 0);
  });
  getSpeciesIcon(species: string): string {
    const icons: { [key: string]: string } = {
      Dog: '/english-cocker_12893777.gif',
      Cat: '/cat_17092250.gif',
      Bird: '/animals_14822316.gif',
      Rabbit: '/rabbit_12086781.gif',
      Reptile: '/andrias-davidianus_12217712.gif'
    };
    return icons[species] || '/default-icon.gif';
  }
  getSpeciesDescription(species: string): string {
    const descriptions: { [key: string]: string } = {
      Dog: "Man's best friend. Loyal and loving companions.",
      Cat: "Independent and curious. Perfect for a cozy home.",
      Bird: "Colorful and chirpy. Great for adding life to your home.",
      Rabbit: "Soft and cuddly. Ideal for gentle and loving owners.",
      Reptile: "Unique and fascinating. Perfect for exotic pet enthusiasts."
    };
    return descriptions[species] || 'Adorable and lovable pets.';
  }
}
