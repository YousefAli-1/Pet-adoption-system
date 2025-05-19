import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AdminSettingsUpdate } from '../../adminSettings.update';
import { inject,Injectable, signal } from '@angular/core';
import { Admin } from '../../admin.models';




@Component({
  selector: 'app-settings',
  imports: [MatFormFieldModule, MatSlideToggleModule, FormsModule,
     MatInputModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class AdminSettingsComponent {

  private adminService = inject(AdminSettingsUpdate);
    admin: Admin = this.adminService.getLoggedInAdminSignal();
    showPassword = false; 
    showConfirmPassword = false;
    confirmPassword = this.admin.password;
  
    saveChanges() {
      if (this.confirmPassword !== this.admin.password) {
        this.adminService.triggerError('Passwords do not match! Try Again');
        return;
      }
      this.adminService.updateLoggedInAdmin(this.admin);
      this.adminService.trigger('Account info saved successfully!');
    }
}
