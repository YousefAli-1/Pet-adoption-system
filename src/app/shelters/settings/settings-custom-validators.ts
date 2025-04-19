import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SheltersService } from '../shelters.service';

interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

@Injectable({ providedIn: 'root' })
export class SettingsCustomValidators {
  private sheltersService = inject(SheltersService);

  isNewPasswordRequired(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (
        ((formGroup.get('oldPassword')?.value as string) !== '' &&
          (formGroup.get('newPassword')?.value as string) === '') ||
        (formGroup.get('newPassword')?.value === null &&
          formGroup.get('oldPassword')?.value !== null)
      ) {
        const error = {
          newPasswordRequired: true,
        };
        formGroup.get('newPassword')?.setErrors(error);
        return error;
      }

      return null;
    };
  }
  isConfirmNewPasswordMatchesNewPassword(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      if (
        (formGroup.get('newPassword')?.value as string) !==
        (formGroup.get('confirmNewPassword')?.value as string)
      ) {
        const error = {
          confirmPasswordShouldMatchNewPassword: true,
        };
        formGroup.get('confirmNewPassword')?.setErrors(error);
        return error;
      }

      return null;
    };
  }
  isPasswordCorrect(): ValidatorFn {
    return (control: AbstractControl) => {
      if (
        control.value &&
        (control.value as string) !==
          this.sheltersService?.loggedInShelter().password &&
        (control.value as string) !== ''
      ) {
        return { incorrectPassword: true };
      }

      return null;
    };
  }
}
