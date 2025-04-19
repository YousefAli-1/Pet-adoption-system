import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SheltersService } from './shelters/shelters.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pet-adoption-system';
  userTypeSignal = signal<'adopter' | 'shelter' | ''>('');
  constructor(private sheltersService: SheltersService) {
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
  ngOnInit() {
    const storedType = localStorage.getItem('userType');
    this.userTypeSignal.set((storedType === 'adopter' || storedType === 'shelter') ? storedType : '');
    
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    if (email && password) {
      this.sheltersService.login(email, password);
    }
  }
}
