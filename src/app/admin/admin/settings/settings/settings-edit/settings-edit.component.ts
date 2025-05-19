import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings-edit',
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
     MatSlideToggleModule, MatCardModule, MatButtonModule],
  templateUrl: './settings-edit.component.html',
  styleUrl: './settings-edit.component.scss'
})
export class SettingsEditComponent {
  admin ={
    name : 'ibrhaim',
    email: 'ibrahim@example.com',
    password: '',
    notificationsEnabled: true


  };
  saveChanges(){
    console.log('admin settings saved: ',this.admin);
    alert('seetings saved successfully ');
  }
}
