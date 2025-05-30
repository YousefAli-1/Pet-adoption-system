import { Injectable, signal } from '@angular/core';
import { shelterEssentialType, ShelterType } from './shelters.model';
import { shelters as dummy_shelters } from './dummy-shelters';

type editProfileFormGroupType = Partial<{
  name: string | null;
  locations: string[] | null;
  oldPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
}>;

@Injectable({
  providedIn: 'root',
})
export class SheltersService {
  private emptyShelterObject = {
    name: '',
    email: '',
    password: '',
    locations: [],
    statusCount: {
      adoptedCount: 0,
      waitingForAVisitCount: 0,
      returnedCount: 0,
      waitingForAdoptionCount: 0,
    },
  };

  private allShelters!: ShelterType[];
  private loggedInShelterSignal = signal<ShelterType>(this.emptyShelterObject);
  loggedInShelter = this.loggedInShelterSignal.asReadonly();

  constructor() {
    const allSheltersJson = localStorage.getItem('allShelters');

    if (allSheltersJson) {
      this.allShelters = JSON.parse(allSheltersJson);
      console.log('allShelters ',this.allShelters);
      return;
    }

    this.allShelters = dummy_shelters;
    console.log('allShelters ',this.allShelters);
  }

  addShelter(newShelter: shelterEssentialType) {
    this.allShelters.push({
      ...newShelter,
      statusCount: {
        adoptedCount: 0,
        waitingForAdoptionCount: 0,
        returnedCount: 0,
        waitingForAVisitCount: 0,
      },
    });
    this.updateLocalStorage();
  }

  login(email: string, password: string): boolean {
    const shelter = this.allShelters.find(
      (shelter) => shelter.email === email && shelter.password === password
    );

    if (shelter) {
      this.loggedInShelterSignal.set(shelter);
      return true;
    }

    return false;
  }

  editProfile(editedData: editProfileFormGroupType) {
    //update name
    this.loggedInShelterSignal.update((currentData) => {
      return { ...currentData, name: editedData.name || currentData.name };
    });

    //update locations
    this.loggedInShelterSignal.update((currentData) => {
      return {
        ...currentData,
        locations: editedData.locations || currentData.locations,
      };
    });

    //update password
    if (editedData.oldPassword === this.loggedInShelter().password) {
      this.loggedInShelterSignal.update((currentData) => {
        return {
          ...currentData,
          password: editedData.newPassword || currentData.password,
        };
      });
    }

    //update logged In Shelter in all shelters array
    this.updateLoggedInShelterInShelterArray();

    //update Local Storage Data
    this.updateLocalStorage();
  }

  editPetsStates(newStatus: {
    adoptedCount: number;
    waitingForAVisitCount: number;
    returnedCount: number;
    waitingForAdoptionCount: number;
  }) {
    this.loggedInShelterSignal.update((shelter)=>{return {...shelter, statusCount: newStatus}});

    
    this.updateLoggedInShelterInShelterArray();

    //update Local Storage Data
    this.updateLocalStorage();
  }

  logout() {
    this.loggedInShelterSignal.set(this.emptyShelterObject);
  }

  isShelterLoggedIn(): boolean {
    return this.loggedInShelterSignal().email !== '';
  }

  updateLoggedInShelterInShelterArray(): void{
    this.allShelters = this.allShelters.flatMap((shelter) => {
      if (shelter.email !== this.loggedInShelter().email) {
        return shelter;
      }

      return this.loggedInShelter();
    });
  }

  updateLocalStorage(): void {
    localStorage.setItem('allShelters', JSON.stringify(this.allShelters));
    console.log(this.allShelters);
  }
}
