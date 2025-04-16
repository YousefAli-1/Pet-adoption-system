import { AbstractControl, ValidationErrors } from "@angular/forms";

interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null;
}

export class SettingsCustomValidators {
    static isNewPasswordRequired(): ValidatorFn{
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
      static isConfirmNewPasswordMatchesNewPassword(): ValidatorFn{
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
      static isPasswordCorrect(): ValidatorFn{
        return (control: AbstractControl) => {
          if (control.value && (control.value as string) !== '123' && (control.value as string) !== '') {
            return { incorrectPassword: true };
          }
    
          return null;
        };
      };
}