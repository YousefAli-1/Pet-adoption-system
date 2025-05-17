import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { inject,Injectable, signal } from '@angular/core';


@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, MatSidenavModule, MatButtonModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  isOpened: boolean = false;

  openDrawer(): void {
    this.isOpened = true;
  }

  closeDrawer(): void {
    this.isOpened = false;
  }
}
