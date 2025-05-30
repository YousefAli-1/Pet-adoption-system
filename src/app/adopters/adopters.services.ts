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
    const adoptersJson = localStorage.getItem('allAdopters');
  if (adoptersJson) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(adoptersJson);
    } catch {
      parsed = null;
    }
    if (Array.isArray(parsed)) {
      this.allAdopters = parsed as Adopter[];
    } else {
      console.warn('Invalid allAdopters in storage—resetting to dummy.');
      this.allAdopters = dummy_adopters;
      this.updateAdoptersInLocalStorage();
    }
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
  private _showPopup2 = signal(false);
  private _message = signal('');

  showPopup = () => this._showPopup();
  showPopup2 = () => this._showPopup2();
  message = () => this._message();
  triggerError(message: string) {
    this._message.set(message);
    this._showPopup2.set(true);
    setTimeout(() => this._showPopup2.set(false), 1000); 
  }
  trigger(message: string) {
    this._message.set(message);
    this._showPopup.set(true);
    setTimeout(() => this._showPopup.set(false), 1000); 
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
    console.log('allAdopters:', this.allAdopters, 'isArray?', Array.isArray(this.allAdopters));
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

   updateAdoptersInLocalStorage(): void {
    localStorage.setItem('allAdopters', JSON.stringify(this.allAdopters));
  }

  private updatePostsInLocalStorage(): void {
    localStorage.setItem('allPosts', JSON.stringify(this.allPosts));
  }
}