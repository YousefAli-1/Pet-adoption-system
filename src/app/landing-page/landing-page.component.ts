import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PostsService } from '../posts.service';
import { PostType } from '../shelters/shelters.model';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  selectedType: string = 'all';
  filteredPets: PostType[] = [];

  constructor() {
    this.filteredPets = this.pets();
  }
  
  private postsService = inject(PostsService);
  allPosts = this.postsService.getAllPosts();
  pets = signal(this.getRandomPets(5));

  private getRandomPets(count: number) {
    const allPosts = this.postsService.getAllPosts();
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  filterPets(type: string): void {
    this.selectedType = type;
    if (type === 'all') {
      this.filteredPets = this.pets();
    } else {
      this.filteredPets = this.pets().filter(pet => 
        pet.category === type
      );
    }
  }

  scrollToFooter() {
    const footer = document.querySelector('footer');
    const contactSection = document.querySelector('.contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      if (contactSection) {
        contactSection.classList.add('highlight-glow');
        setTimeout(() => {
          contactSection.classList.remove('highlight-glow');
        }, 3000);
      }
    }
  }
}
