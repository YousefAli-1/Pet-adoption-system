//Angular
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { CommonModule } from '@angular/common';

//Angular Materials
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-shelters',
  imports: [RouterOutlet, MatSidenavModule,CommonModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.scss',
})
export class SheltersComponent {
  isCollapsed = true; 
  closeSidebar() {
    this.isCollapsed = true;
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}