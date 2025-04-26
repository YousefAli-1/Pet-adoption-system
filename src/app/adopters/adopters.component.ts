import { Component,inject } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
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
 adoptersService = inject(AdoptersService);
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
}
