import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { ENTER } from '@angular/cdk/keycodes';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { shelterEssentialType } from '../shelters.model';
import { SettingsCustomValidators } from './settings-custom-validators';
import { SheltersService } from '../shelters.service';
import { MatDialog } from '@angular/material/dialog';
import { DoneSuccessfullyDialogComponent } from '../shared/done-successfully-dialog/done-successfully-dialog.component';

@Component({
  selector: 'app-settings',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private sheltersService = inject(SheltersService);
  shelter = computed(
    () => this.sheltersService.loggedInShelter() as shelterEssentialType
  );
  locations = signal<string[]>(this.shelter().locations);

  readonly locationsSeparatorKeysCodes = [ENTER] as const;

  errorMessages = signal<{
    name: String;
    locations: String;
    oldPassword: String;
    newPassword: String;
    confirmNewPassword: String;
  }>({
    name: '',
    locations: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  hide = signal<{
    oldPassword: boolean;
    newPassword: boolean;
    confirmNewPassword: boolean;
  }>({
    oldPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  editProfileFormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      locations: new FormControl<string[]>([], [Validators.minLength(1)]),
      oldPassword: new FormControl('', [
        SettingsCustomValidators.isPasswordCorrect(),
      ]),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    },
    [
      SettingsCustomValidators.isNewPasswordRequired(),
      SettingsCustomValidators.isConfirmNewPasswordMatchesNewPassword(),
    ]
  );

  hasErrors(formControlName: string): boolean {
    return this.editProfileFormGroup.get(formControlName)?.invalid || false;
  }

  ngOnInit() {
    this.editProfileFormGroup.get('name')?.setValue(this.shelter().name);
  }

  private updateAllErrorMessages() {
    this.updateNameErrorMessage();
    this.updateNewPasswordErrorMessage();
    this.updateConfirmNewPasswordErrorMessage();
    this.updateLocationErrorMessage();
  }

  private openDialog() {
    const subscribtion = this.dialog
      .open(DoneSuccessfullyDialogComponent, {
        width: '250px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
      })
      .afterClosed()
      .subscribe();

    this.destroyRef.onDestroy(() => {
      subscribtion.unsubscribe();
    });
  }

  editProfile() {
    this.editProfileFormGroup.get('locations')?.setValue(this.locations());

    this.updateAllErrorMessages();

    if (this.editProfileFormGroup.invalid) {
      return false;
    }

    this.sheltersService.editProfile(this.editProfileFormGroup.value);
    this.openDialog();
    this.editProfileFormGroup.reset();
    return true;
  }

  resetForm() {
    this.editProfileFormGroup.reset();
    this.editProfileFormGroup.get('name')?.setValue(this.shelter().name);
    this.locations.set(this.shelter().locations);
  }

  toggleIconOldPassword(event: MouseEvent) {
    this.hide.set({ ...this.hide(), oldPassword: !this.hide().oldPassword });
    event.stopPropagation();
  }

  toggleIconNewPassword(event: MouseEvent) {
    this.hide.set({ ...this.hide(), newPassword: !this.hide().newPassword });
    event.stopPropagation();
  }

  toggleIconConfirmNewPassword(event: MouseEvent) {
    this.hide.set({
      ...this.hide(),
      confirmNewPassword: !this.hide().confirmNewPassword,
    });
    event.stopPropagation();
  }

  addLocation(event: MatChipInputEvent): void {
    const newLocation = (event.value || '').trim();

    if (newLocation) {
      this.locations.update((currentLocations) => [
        ...currentLocations,
        newLocation,
      ]);
    }

    event.chipInput!.clear();
  }

  removeLocation(location: String): void {
    this.locations.update((currentLocations) =>
      currentLocations.filter((locationValue) => location !== locationValue)
    );
  }

  editLocation(location: String, event: MatChipEditedEvent) {
    const newLocation = event.value.trim();

    this.removeLocation(location);

    if (newLocation) {
      this.locations.update((currentLocations) => [
        ...currentLocations,
        newLocation,
      ]);
    }
  }

  updateNameErrorMessage() {
    if (this.editProfileFormGroup.get('name')?.getError('required')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        name: 'Shelter name is required',
      });
    } else if (this.editProfileFormGroup.get('name')?.getError('minlength')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        name: 'Invalid shelter name',
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), name: '' });
    }
  }

  updateLocationErrorMessage() {
    if (this.editProfileFormGroup.get('locations')?.getError('minlength')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        locations: 'You must input at least one location',
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), locations: '' });
    }
  }

  updateOldPasswordErrorMessage() {
    if (
      this.editProfileFormGroup
        .get('oldPassword')
        ?.getError('incorrectPassword')
    ) {
      this.errorMessages.set({
        ...this.errorMessages(),
        oldPassword: 'Incorrect password',
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), oldPassword: '' });
    }
  }

  updateNewPasswordErrorMessage() {
    if (
      this.editProfileFormGroup
        .get('newPassword')
        ?.getError('newPasswordRequired')
    ) {
      this.errorMessages.set({
        ...this.errorMessages(),
        newPassword: 'New password is required',
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), newPassword: '' });
    }
  }

  updateConfirmNewPasswordErrorMessage() {
    if (
      this.editProfileFormGroup
        .get('confirmNewPassword')
        ?.getError('confirmPasswordShouldMatchNewPassword')
    ) {
      this.errorMessages.set({
        ...this.errorMessages(),
        confirmNewPassword: 'Confirm password should match new password',
      });
    } else {
      this.errorMessages.set({
        ...this.errorMessages(),
        confirmNewPassword: '',
      });
    }
  }
}
