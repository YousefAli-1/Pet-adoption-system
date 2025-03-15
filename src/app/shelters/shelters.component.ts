import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shelters',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.scss',
})
export class SheltersComponent {
  isOpened: boolean = false;

  openDrawer(): void {
    this.isOpened = true;
  }

  closeDrawer(): void {
    this.isOpened = false;
  }
}
