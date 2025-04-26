import { inject,Injectable, signal } from '@angular/core';
import { Adopter} from './adopters.model';
import { PostType, PostStatusType } from '../shelters/shelters.model';
import {dummy_adopters} from './dummy-adopters'
import { posts } from '../dummy-posts';

@Injectable({
  providedIn: 'root',
})

export class AdoptersService {
    private emptyAdopterObject: Adopter = {
        name: '',
        email: '',
        password: '',
        savedPets: [],
        requestedPets: [],
        adoptedPets: []
      };
      
  private allAdopters: Adopter[] = [];
  public loggedInAdopterSignal = signal<Adopter>(this.emptyAdopterObject);
  loggedInAdopter = this.loggedInAdopterSignal.asReadonly();
  
  private allPosts: PostType[] = [];
  private filteredPostsSignal = signal<PostType[]>([]);
  filteredPosts = this.filteredPostsSignal.asReadonly();
  
 
  private speciesCountSignal = signal<{ [key: string]: number }>({});
  speciesCount = this.speciesCountSignal.asReadonly();

  constructor() {
    // Initialize adopters data
    const adoptersJson = localStorage.getItem('allAdopters');
    if (adoptersJson) {
      this.allAdopters = JSON.parse(adoptersJson);
    } else {
      this.allAdopters = dummy_adopters;
      this.updateAdoptersInLocalStorage();
    }
    
    const loggedInAdopterJson = localStorage.getItem('loggedInAdopter');
    if (loggedInAdopterJson) {
      this.loggedInAdopterSignal.set(JSON.parse(loggedInAdopterJson));
    } else {
      this.loggedInAdopterSignal.set(this.emptyAdopterObject);
    }
    
    
    const postsJson = localStorage.getItem('allPosts');
    if (postsJson) {
      this.allPosts = JSON.parse(postsJson);
    } else {
      this.allPosts = posts;
      this.updatePostsInLocalStorage();
    }

    this.filteredPostsSignal.set(this.allPosts);
  }
  private _showPopup = signal(false);
  private _message = signal('');

  showPopup = () => this._showPopup();
  message = () => this._message();

  trigger(message: string) {
    this._message.set(message);
    this._showPopup.set(true);
    setTimeout(() => this._showPopup.set(false), 3000); 
  }

  register(name: string, email: string, password: string): boolean {
    if (this.allAdopters.some(adopter => adopter.email === email)) {
      return false;
    }
    
    const newAdopter: Adopter = {
      name,
      email,
      password,
      savedPets: [],
      requestedPets: [],
      adoptedPets: []
    };
    
    this.allAdopters.push(newAdopter);
    this.updateAdoptersInLocalStorage();
    return true;
  }

  login(email: string, password: string): boolean {
    const adopter = this.allAdopters.find(
      (adopter) => adopter.email === email && adopter.password === password
    );
    
    if (adopter) {
      this.loggedInAdopterSignal.set(adopter);
      localStorage.setItem('loggedInAdopter', JSON.stringify(adopter));
      return true;
    }
    
    return false;
  }

  logout(): void {
    this.loggedInAdopterSignal.set(this.emptyAdopterObject);
    localStorage.removeItem('loggedInAdopter');
  }

  isLoggedIn(): boolean {
    return this.loggedInAdopterSignal().email !== '';
  }
  getAdopterName(): string {
    return this.loggedInAdopter()?.name || 'Guest';
  }
  editProfile(editedData: Partial<{ name: string; oldPassword: string; newPassword: string; confirmNewPassword: string }>) {
    const current = this.loggedInAdopterSignal();

    this.loggedInAdopterSignal.update((adopter) => ({
      ...adopter,
      name: editedData.name || adopter.name,
    }));

    if (editedData.oldPassword === current.password && editedData.newPassword) {
      this.loggedInAdopterSignal.update((adopter) => ({
        ...adopter,
        password: editedData.newPassword!,
      }));
    }
  
    this.updateLoggedInAdopter(this.loggedInAdopterSignal());
  }
  

  updateLoggedInAdopter(adopter: Adopter): void {
    this.loggedInAdopterSignal.set({...adopter});
    
    this.allAdopters = this.allAdopters.map(a => 
      a.email === adopter.email ? adopter : a
    );
    
    localStorage.setItem('loggedInAdopter', JSON.stringify(adopter));
    this.updateAdoptersInLocalStorage();
  }

  getLoggedInAdopterSignal(): Adopter {
    return this.loggedInAdopterSignal();
  }

  private updateAdoptersInLocalStorage(): void {
    localStorage.setItem('allAdopters', JSON.stringify(this.allAdopters));
  }

  private updatePostsInLocalStorage(): void {
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts));
  }
}