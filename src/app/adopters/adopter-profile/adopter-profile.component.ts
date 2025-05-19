import { Component, signal } from '@angular/core';
import { PostType } from '../../shelters/shelters.model';

@Component({
  selector: 'app-adopter-profile',
  imports: [],
  templateUrl: './adopter-profile.component.html',
  styleUrl: './adopter-profile.component.scss'
})
export class AdopterProfileComponent {
  adopter = JSON.parse(localStorage.getItem('loggedInAdopter') || '{}');
  requestedPets = signal<PostType[]>([]);
  adoptedPets = signal<PostType[]>([]);
  savedPets = signal<PostType[]>([]);
  constructor() {
    this.requestedPets.set(this.adopter.requestedPets);
    this.adoptedPets.set(this.adopter.adoptedPets);
    this.savedPets.set(this.adopter.savedPets);
  }
}
