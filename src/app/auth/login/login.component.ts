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
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private router: Router, 
    private sheltersService: SheltersService,
    public adoptersService: AdoptersService,
    public adminService :AdminSettingsUpdate,
    private authService: AuthService
  ) {}

  login() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    
    if (this.adoptersService.login(email, password)) {
      this.authService.login('adopter', email, password);
      this.router.navigate(['/adopter/dashboard']); 
      return;
    }
    if (this.adminService.login(email, password)) {
      this.authService.login('admin', email, password);
      this.router.navigate(['/admin/dashboard']); 
      return;
    }
    if (this.sheltersService.login(email, password)) {
      this.authService.login('shelter', email, password);
      this.router.navigate(['/shelter/dashboard']);
      return;
    }
    this.adoptersService.triggerError('Invalid email or password')
  }
}
