import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { inject,Injectable, signal } from '@angular/core';
import { Admin } from '../../../admin.models';
import { AdminSettingsUpdate } from '../../../adminSettings.update';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-settings-edit',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
     MatSlideToggleModule, MatCardModule, MatButtonModule, RouterModule, NgIf],
  templateUrl: './settings-edit.component.html',
  styleUrl: './settings-edit.component.scss'
})
export class SettingsEditComponent {
  public adminService = inject(AdminSettingsUpdate);
    admin: Admin = this.adminService.getLoggedInAdminSignal();
    showPassword = false; 
    showConfirmPassword = false;
    confirmPassword = this.admin.password;
  
    saveChanges() {
      if (this.confirmPassword !== this.admin.password) {
        this.adminService.triggerError('Passwords do not match! Try Again');
        console.log('s1 -',this.confirmPassword,'s2 -', this.admin.password);
        console.log('m1',localStorage.getItem('loggedInAdmin'));

        return;
      }

      this.adminService.updateLoggedInAdmin(this.admin);
      this.adminService.trigger('Account info saved successfully!');
      console.log('m3',localStorage.getItem('loggedInAdmin'));

}
}