import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SheltersService } from '../../../shelters/shelters.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-manage-shelters',
  imports: [NgIf, FormsModule, NgFor],
  templateUrl: './manage-shelters.component.html',
  styleUrl: './manage-shelters.component.scss',
  providers: [SheltersService]
})
export class ManageSheltersComponent implements OnInit {
  shelter: any[] = [];
  constructor(private sheltersService: SheltersService){
    
  }

  ngOnInit() {
    this.sheltersService.updateLocalStorage();
    this.loadShelters();
    console.log("ss- " ,localStorage.getItem('allShelters'));
  }

  loadShelters() {
    const storedShelters = localStorage.getItem('allShelters');
    this.shelter = storedShelters ? JSON.parse(storedShelters) : [];
  }

  saveShelters() {
    localStorage.setItem('allShelters', JSON.stringify(this.shelter));
  }

  // addShelters(shelters: any) {
  //   this.shelter.push({ ...shelters, isEditing: false });
  //   this.saveShelters();
  // }

  // editShlters(index: number) {
  //   this.shelter[index].isEditing = true;
  // }

  // saveEditedShelters(index: number) {
  //   this.shelter[index].isEditing = false;
  //   this.saveShelters();
  // }

  // cancelEdit(index: number) {
  //   this.loadShelters();
  // }

  deleteShelters(index: number) {
    this.shelter.splice(index, 1);
    this.saveShelters();
  }
}
