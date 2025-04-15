import { Component, inject, signal } from '@angular/core';
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
import { PostType } from '../shelters.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  post = signal<PostType>({
    ID: 0,
    imgName: '',
    species: '',
    category: '',
    age: 0,
    status: 'Adopted',
    location: '',
  });
  errorMessages = signal<{
    category: String;
    species: String;
    age: String;
  }>({ category: '', species: '', age: '' });
  editPostFormGroup = new FormGroup({
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

  private activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.activatedRoute.data.subscribe(({ post }) => {
      this.post.set(post);
    });
  }

  editPost() {
    if (this.editPostFormGroup.invalid) {
      console.log(this.editPostFormGroup);
      return false;
    }

    console.log(this.editPostFormGroup);
    this.editPostFormGroup.reset();
    return true;
  }

  updateCategoryErrorMessage() {
    if (this.editPostFormGroup.get('category')?.getError('required')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        category: "Animal's Category is required",
      });
    } else if (this.editPostFormGroup.get('category')?.getError('pattern')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        category: "Animal's Category can only contain characters",
      });
    } else {
      this.errorMessages.set({ ...this.errorMessages(), category: '' });
    }
  }

  updateSpeciesErrorMessage() {
    if (this.editPostFormGroup.get('species')?.getError('required')) {
      this.errorMessages.set({
        ...this.errorMessages(),
        species: "Animal's Category is required",
      });
    } else if (this.editPostFormGroup.get('species')?.getError('pattern')) {
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
      this.editPostFormGroup.get('age')?.getError('min') ||
      this.editPostFormGroup.get('age')?.getError('max')
    ) {
      this.errorMessages.set({
        ...this.errorMessages(),
        age: 'Age must be between 1 and 241 months',
      });
    } else if (this.editPostFormGroup.get('age')?.invalid) {
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
    this.editPostFormGroup.patchValue({ image: file });
  }
}
