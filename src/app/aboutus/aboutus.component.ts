import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  imports: [RouterLink],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
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
}
