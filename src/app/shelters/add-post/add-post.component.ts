import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-add-post',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  errorMessages = signal<{
    category: String;
    species: String;
    age: String;
  }>({ category: '', species: '', age: '' });
  addPostFormGroup = new FormGroup({
    image: new FormControl<File | null>(null, [Validators.required]),
    category: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    species: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    age: new FormControl(0, [Validators.min(1), Validators.max(241)]),
    location: new FormControl(''),
  });
  shelterLocations = signal<String[]>(['trial', 'trial 2', 'trail 3']);

  addPost() {
    if (this.addPostFormGroup.invalid) {
      console.log(this.addPostFormGroup);
      return false;
    }

    console.log(this.addPostFormGroup);
    this.addPostFormGroup.reset();
    return true;
  }

  updateCategoryErrorMessage() {
    if (this.addPostFormGroup.get('category')?.getError('required')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        category: "Animal's Category is required",
      });
    } else if (this.addPostFormGroup.get('category')?.getError('pattern')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        category: "Animal's Category can only contain characters",
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), category: '' });
    }
  }

  updateSpeciesErrorMessage() {
    if (this.addPostFormGroup.get('species')?.getError('required')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        species: "Animal's Category is required",
      });
    } else if (this.addPostFormGroup.get('species')?.getError('pattern')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        species: "Animal's Category can only contain characters",
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), species: '' });
    }
  }

  updateAgeErrorMessage() {
    if (
      this.addPostFormGroup.get('age')?.getError('min') ||
      this.addPostFormGroup.get('age')?.getError('max')
    ) {
      this.errorMessages.set({
        ...this.errorMessages(),
        age: 'Age must be between 1 and 241 months',
      });
    } else if (this.addPostFormGroup.get('age')?.invalid) {
      this.errorMessages.set({
        ...this.errorMessages(),
        age: "Age can't contain characters or special characters",
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), age: '' });
    }
  }

  onImagePicked(element: any) {
    const file = element.files[0];
    this.addPostFormGroup.patchValue({ image: file });
  }
}
