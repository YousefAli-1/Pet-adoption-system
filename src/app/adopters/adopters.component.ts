import { Component,inject } from '@angular/core';
import { RouterOutlet,RouterLink,Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AdoptersService } from './adopters.services';
@Component({
  selector: 'app-adopters',
  imports: [RouterOutlet,CommonModule,RouterLink],
  templateUrl: './adopters.component.html',
  styleUrl: './adopters.component.scss'
})

export class AdoptersComponent {
  constructor(private modalService: NgbModal) {
  }
  selectedType: string = '';
  adoptersService = inject(AdoptersService);
  private route=inject(Router);
  isCollapsed = true; 
  closeSidebar() {
    this.isCollapsed = true;
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  isOpened: boolean = false;

  openDrawer(): void {
    this.isOpened = true;
  }

  closeDrawer(): void {
    this.isOpened = false;
  }
  isDropdownOpen = false; 

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownMenu = document.querySelector('#petsDropdown + .dropdown-menu');
    
    if (this.isDropdownOpen) {
      dropdownMenu?.classList.add('show');
    } else {
      dropdownMenu?.classList.remove('show');
    }
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    const dropdownMenu = document.querySelector('#petsDropdown + .dropdown-menu');
    dropdownMenu?.classList.remove('show');
  }
  filterPets(input:string) {
this.closeDropdown();
    const category = input;
    if(input === 'all') {
      this.route.navigate(['adopter/pets'], { 
        queryParams: { 
          q: '',
          category: input 
        } 
      });
      return;
    }else{
    this.route.navigate(['adopter/pets'], { 
      queryParams: { 
        q: input,
        category: category, 
      } 
    });
    
  }
  }
}
