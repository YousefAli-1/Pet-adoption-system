import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const adopters = JSON.parse(localStorage.getItem('adopters') || '[]');
    const adopter = adopters.find((a: any) => a.email === email && a.password === password);
    if (adopter) {
      localStorage.setItem('userType', 'adopter');
      this.router.navigate(['/adopter/dashboard']);
      return;
    }
    const shelters = JSON.parse(localStorage.getItem('shelters') || '[]');
    const shelter = shelters.find((s: any) => s.email === email && s.password === password);
    if (shelter) {
      localStorage.setItem('userType', 'shelter'); 
      this.router.navigate(['/shelter/dashboard']);
      return;
    }
    alert('Invalid email or password');
  }
}
