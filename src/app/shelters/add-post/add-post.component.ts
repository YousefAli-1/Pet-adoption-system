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
import { MatSelectModule } from '@angular/material/select';
import { SheltersService } from '../shelters.service';
import { PostsService } from '../../posts.service';
import { MatDialog } from '@angular/material/dialog';
import { DoneSuccessfullyDialogComponent } from '../shared/done-successfully-dialog/done-successfully-dialog.component';
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
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private sheltersService = inject(SheltersService);
  private postsService = inject(PostsService);

  shelterLocations = computed(
    () => this.sheltersService.loggedInShelter().locations
  );

  errorMessages = signal<{
    category: String;
    species: String;
    age: String;
  }>({ category: '', species: '', age: '' });

  addPostFormGroup = new FormGroup({
    image: new FormControl<File | null>(null, [Validators.required]),
    category: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    species: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
    ]),
    age: new FormControl(0, [Validators.min(1), Validators.max(241)]),
    location: new FormControl(this.shelterLocations()[0]),
  });

  hasErrors(formControlName: string): boolean {
    return this.addPostFormGroup.get(formControlName)?.invalid || false;
  }

  private updateAllErrorMessages() {
    this.updateCategoryErrorMessage();
    this.updateSpeciesErrorMessage();
    this.updateAgeErrorMessage();
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

  addPost() {
    this.updateAllErrorMessages();

    if (this.addPostFormGroup.invalid) {
      return false;
    }

    const postData = {
      ...this.addPostFormGroup.value,
      image: this.addPostFormGroup.value.image?.name || '',
    };

    this.postsService.addPost(
      postData,
      this.sheltersService.loggedInShelter().email
    );

    this.sheltersService.editPetsStates({
      ...this.sheltersService.loggedInShelter().statusCount,
      waitingForAdoptionCount:
        this.sheltersService.loggedInShelter().statusCount
          .waitingForAdoptionCount + 1,
    });

    this.openDialog();
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
