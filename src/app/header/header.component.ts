import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userType: 'adopter' | 'shelter' | '' = '';
  constructor(private router: Router) {
  }
  
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
    this.userType = '';
    localStorage.setItem('userType', '');
    this.router.navigate(['/']);
  }
  ngOnInit() {
    this.userType = localStorage.getItem('userType') as 'adopter' | 'shelter' | '';
    console.log(this.userType);
  }
}
