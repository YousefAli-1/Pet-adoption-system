import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-done-successfully-dialog',
  imports: [MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './done-successfully-dialog.component.html',
  styleUrl: './done-successfully-dialog.component.scss'
})
export class DoneSuccessfullyDialogComponent {
  readonly dialog = inject(MatDialogRef<DoneSuccessfullyDialogComponent>);

  closeDialog(){
    this.dialog.close();
  }
}
