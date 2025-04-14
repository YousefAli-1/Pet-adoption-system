import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  selectedType: string = 'all';
  filteredPets: any[] = [];

  constructor() {
    this.filteredPets = this.pets;
  }
  pets: any[] = [
    {
      name: 'Max',
      type: 'dogs',
      breed: 'Golden Retriever',
      age: 2,
      imageUrl: 'Golden Retriever Puppy.jpeg'
    },
    {
      name: 'Luna',
      type: 'cats', 
      breed: 'Persian',
      age: 1,
      imageUrl: 'egyptian mau.PNG'
    },
    {
      name: 'Charlie',
      type: 'birds',
      breed: 'Parakeet',
      age: 3,
      imageUrl: 'Bird.jpg'
    },
    {
      name: 'Oreo',
      type: 'others',
      breed: 'Rabbit',
      age: 1,
      imageUrl: 'Rabbit.jpg'
    }
  ];

  filterPets(type: string): void {
    this.selectedType = type;
    if (type === 'all') {
      this.filteredPets = this.pets;
    } else {
      this.filteredPets = this.pets.filter(pet => pet.type === type);
    }
    console.log(this.filteredPets);
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
