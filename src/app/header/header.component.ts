import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  scrollToFooter() {
    const footer = document.querySelector('footer');
    const contactSection = document.querySelector('.contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
      if (contactSection) {
        contactSection.classList.add('highlight-glow');
        setTimeout(() => {
          contactSection.classList.remove('highlight-glow');
        }, 3000);
      }
    }
  }

  logout() {
    if(localStorage.getItem('userType') === 'adopter') {
    localStorage.removeItem('loggedInAdopter');
    }
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
