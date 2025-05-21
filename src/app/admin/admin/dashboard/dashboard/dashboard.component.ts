import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    // isOpened: boolean = false;
  
    // openDrawer(): void {
    //   this.isOpened = true;
    // }
  
    // closeDrawer(): void {
    //   this.isOpened = false;
    // }
      constructor(private router: Router) {}

  goToShelters() {
    this.router.navigate(['/admin/shelters']);
  }
  goToAdopters() {
    this.router.navigate(['/admin/adopters']);
  }
  goToPets() {
    this.router.navigate(['/admin/pets']);
  }
}
