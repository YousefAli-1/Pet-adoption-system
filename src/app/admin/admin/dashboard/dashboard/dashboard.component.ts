import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
 
    isOpened: boolean = false;
  
    openDrawer(): void {
      this.isOpened = true;
    }
  
    closeDrawer(): void {
      this.isOpened = false;
    }
}
