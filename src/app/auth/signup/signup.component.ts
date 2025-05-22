import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { SheltersService } from '../../shelters/shelters.service';
import { CommonModule } from '@angular/common';
import { AdoptersService } from '../../adopters/adopters.services';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  userType: 'adopter' | 'shelter' = 'adopter';
  name: string = '';
  email: string = '';
  password: string = '';
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private sheltersService: SheltersService,
    private adoptersService: AdoptersService
  ) {}

  toggleUserType(type: 'adopter' | 'shelter') {
    this.userType = type;
  }

  onNameChange() {
    this.validateName();
  }

  onEmailChange() {
    this.validateEmail();
  }

  onPasswordChange() {
    this.validatePassword();
  }

  validateName(): boolean {
    if (!this.name) {
      this.nameError = 'Name is required';
      return false;
    }
    if (this.name.length < 2) {
      this.nameError = 'Name must be at least 2 characters';
      return false;
    }
    if (!/^[a-zA-Z\s]*$/.test(this.name)) {
      this.nameError = 'Name can only contain letters and spaces';
      return false;
    }
    this.nameError = '';
    return true;
  }

  validateEmail(): boolean {
    if (!this.email) {
      this.emailError = 'Email is required';
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return false;
    }
    this.emailError = '';
    return true;
  }

  validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'Password is required';
      return false;
    }
    if (this.password.length < 8) {
      this.passwordError = 'Password must be at least 8 characters';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  signup() {
    const isNameValid = this.validateName();
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
      if (this.userType === 'adopter') {
        this.adoptersService.register(this.name, this.email, this.password);
        this.router.navigate(['/login']);
      } else {
        this.sheltersService.addShelter({ name: this.name, email: this.email, password: this.password, locations: [] });
        this.router.navigate(['/login']);
      }
    }
  }
}
