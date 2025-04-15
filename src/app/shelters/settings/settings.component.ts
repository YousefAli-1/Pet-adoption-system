import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { shelterEssentialType } from '../shelters.model';

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

@Component({
  selector: 'app-settings',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  shelter = signal<shelterEssentialType>({
    ID: 0,
    name: '',
    password: '',
    locations: [],
  });
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

  editProfileFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    locations: FormControl<string[] | null>;
    oldPassword: FormControl<string | null>;
    newPassword: FormControl<string | null>;
    confirmNewPassword: FormControl<string | null>;
  }>;

  private isNewPasswordRequired(): ValidatorFn{
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (
        (formGroup.get('oldPassword')?.value as string) !==
          '' &&
        (formGroup.get('newPassword')?.value as string) === ''
      ) {
        const error={
          newPasswordRequired: true,
        };
        formGroup.get('newPassword')?.setErrors(error);
        return error;
      }

      return null;
    };
  };
  private isConfirmNewPasswordMatchesNewPassword(): ValidatorFn{
    return (formGroup: AbstractControl) => {
      if (
        (formGroup.get('newPassword')?.value as string) !==
        (formGroup.get('confirmNewPassword')?.value as string)
      ) {
        const error={
          confirmPasswordShouldMatchNewPassword: true,
        };
        formGroup.get('confirmNewPassword')?.setErrors(error);
        return error;
      }

      return null;
    };
  };
  private isPasswordCorrect(): ValidatorFn{
    return (control: AbstractControl) => {
      if (control.value && (control.value as string) !== '123' && (control.value as string) !== '') {
        return { incorrectPassword: true };
      }

      return null;
    };
  };

  ngOnInit(): void {
    this.editProfileFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      locations: new FormControl<string[]>([], [Validators.minLength(1)]),
      oldPassword: new FormControl('', [this.isPasswordCorrect()]),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl(''),
    },[this.isNewPasswordRequired(), this.isConfirmNewPasswordMatchesNewPassword()]);
  }

  editProfile() {
    this.updateNewPasswordErrorMessage();
    this.updateConfirmNewPasswordErrorMessage();
    if (this.editProfileFormGroup.invalid) {
      console.log(this.editProfileFormGroup);
      return false;
    }

    console.log(this.editProfileFormGroup);
    this.editProfileFormGroup.reset();
    return true;
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
      this.editProfileFormGroup.get('newPassword')?.getError('newPasswordRequired')
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
      this.editProfileFormGroup.get('confirmNewPassword')?.getError('confirmPasswordShouldMatchNewPassword')
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
