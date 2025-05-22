import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SheltersService } from '../../shelters/shelters.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AdoptersService } from '../../adopters/adopters.services';
import { AdminSettingsUpdate } from '../../admin/admin/adminSettings.update';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private sheltersService: SheltersService,
    public adoptersService: AdoptersService,
    public adminService: AdminSettingsUpdate,
    private authService: AuthService
  ) {}

  onEmailChange() {
    this.validateEmail();
  }

  onPasswordChange() {
    this.validatePassword();
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
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.password)) {
      this.passwordError = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
      return false;
    }
    this.passwordError = '';
    return true;
  }

  login() {
    if (!this.validateEmail() || !this.validatePassword()) {
      return;
    }
    
    if (this.adoptersService.login(this.email, this.password)) {
      this.authService.login('adopter', this.email, this.password);
      this.router.navigate(['/adopter/dashboard']);
      return;
    }
    if (this.adminService.login(this.email, this.password)) {
      this.authService.login('admin', this.email, this.password);
      this.router.navigate(['/admin/dashboard']); 
      return;
    }
    if (this.sheltersService.login(this.email, this.password)) {
      this.authService.login('shelter', this.email, this.password);
      this.router.navigate(['/shelter/dashboard']);
      return;
    }
    this.adoptersService.triggerError('Invalid email or password')
  }
}
