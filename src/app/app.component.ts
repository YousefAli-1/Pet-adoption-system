import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pet-adoption-system';
  constructor() {
    // Listen for router navigation events
    window.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('a[routerLink]')) {
        if (!target.textContent?.toLowerCase().includes('contact us')) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}
