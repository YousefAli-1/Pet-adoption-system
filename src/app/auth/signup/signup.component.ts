import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SheltersService } from '../../shelters/shelters.service';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, FormsModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userType: 'adopter' | 'shelter' = 'adopter';

  constructor(
    private router: Router,
    private sheltersService: SheltersService
  ) {}

  toggleUserType(type: 'adopter' | 'shelter') {
    this.userType = type;
  }

  signup() {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log(name, email, password);

    if (this.userType === 'adopter') {
      const adopters = JSON.parse(localStorage.getItem('adopters') || '[]');
      adopters.push({ name, email, password });
      localStorage.setItem('adopters', JSON.stringify(adopters));
      this.router.navigate(['/login']);
    } else {
      this.sheltersService.addShelter({ name, email, password, locations: [] });
      this.router.navigate(['/login']);
    }
  }
}
