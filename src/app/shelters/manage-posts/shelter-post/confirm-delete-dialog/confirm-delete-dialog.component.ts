import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  imports: [MatButtonModule, MatDialogContent, MatDialogTitle, MatDialogActions],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.scss'
})
export class ConfirmDeleteDialogComponent {
  readonly dialog = inject(MatDialogRef<ConfirmDeleteDialogComponent>);

  closeDialog(isConfirmed: boolean){
    this.dialog.close(isConfirmed);
  }
}
