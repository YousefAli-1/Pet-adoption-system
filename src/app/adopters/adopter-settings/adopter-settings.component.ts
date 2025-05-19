import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Adopter } from '../adopters.model';
import { AdoptersService } from '../adopters.services';

@Component({
  selector: 'app-adopter-settings',
  imports: [FormsModule],
  templateUrl: './adopter-settings.component.html',
  styleUrls: ['./adopter-settings.component.scss']   
})
export class AdopterSettingsComponent {
  private adoptersService = inject(AdoptersService);

  adopter: Adopter = this.adoptersService.getLoggedInAdopterSignal();
  showPassword = false;
  showConfirmPassword = false;
  confirmPassword = this.adopter.password;

  saveChanges() {
    if (this.confirmPassword !== this.adopter.password) {
      this.adoptersService.triggerError('Passwords do not match! Try Again');
      return;
    }

    // delegate everything to the service
    this.adoptersService.updateLoggedInAdopter(this.adopter);
    this.adoptersService.trigger('Account info saved successfully!');
  }
}
