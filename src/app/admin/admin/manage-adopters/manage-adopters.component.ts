import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AdoptersService } from '../../../adopters/adopters.services';

@Component({
  selector: 'app-manage-adopters',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './manage-adopters.component.html',
  styleUrl: './manage-adopters.component.scss',
  providers: [AdoptersService]
  
})
export class ManageAdoptersComponent implements OnInit {
  adopters: any[] = [];

    constructor(private adoptersService: AdoptersService){
      
    }
  ngOnInit() {
    this.adoptersService.updateAdoptersInLocalStorage();
    this.loadAdopters();
    console.log("ss- ",localStorage.getItem('allAdopters'));
  }

  loadAdopters() {
    const storedAdopters = localStorage.getItem('allAdopters');
    this.adopters = storedAdopters ? JSON.parse(storedAdopters) : [];
  }

  saveAdopters() {
    localStorage.setItem('allAdopters', JSON.stringify(this.adopters));
  }
    deleteAdopter(index: number) {
    this.adopters.splice(index, 1);
    this.saveAdopters();
  }

  // addAdopters(adopter: any) {
  //   this.adopters.push({ ...adopter, isEditing: false });
  //   this.saveAdopters();
  // }

  // editAdopter(index: number) {
  //   this.adopters[index].isEditing = true;
  // }

  // saveEditedAdopter(index: number) {
  //   this.adopters[index].isEditing = false;
  //   this.saveAdopters();
  // }

  // cancelEdit(index: number) {
  //   this.loadAdopters(); // reload from storage to revert changes
  // }


}
