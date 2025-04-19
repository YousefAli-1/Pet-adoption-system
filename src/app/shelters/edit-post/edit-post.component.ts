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
import { PostType } from '../shelters.model';
import { ActivatedRoute } from '@angular/router';
import { SheltersService } from '../shelters.service';
import { PostsService } from '../../posts.service';
import { MatDialog } from '@angular/material/dialog';
import { DoneSuccessfullyDialogComponent } from '../shared/done-successfully-dialog/done-successfully-dialog.component';

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
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private sheltersService = inject(SheltersService);
  private postsService = inject(PostsService);

  post = signal<PostType>({
    ID: 0,
    shelterEmail: '',
    imgName: '',
    species: '',
    category: '',
    age: 0,
    status: 'WaitingForAdoption',
    location: '',
  });
  shelterLocations = computed(
    () => this.sheltersService.loggedInShelter().locations
  );
  errorMessages = signal<{
    category: String;
    species: String;
    age: String;
  }>({ category: '', species: '', age: '' });
  editPostFormGroup = new FormGroup({
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
    status: new FormControl<
      'Adopted' | 'WaitingForAVisit' | 'Returned' | 'WaitingForAdoption'
    >('WaitingForAdoption'),
  });

  private activatedRoute = inject(ActivatedRoute);
  ngOnInit() {
    this.activatedRoute.data.subscribe(({ post }) => {
      this.post.set(post);

      this.editPostFormGroup.setValue({
        image: new File([], post.imgName),
        category: post.category,
        species: post.species,
        age: post.age,
        location: post.location,
        status: post.status,
      });
    });
  }

  hasErrors(formControlName: string): boolean {
    return this.editPostFormGroup.get(formControlName)?.invalid || false;
  }

  private updateAllErrorMessages() {
    this.updateCategoryErrorMessage();
    this.updateSpeciesErrorMessage();
    this.updateAgeErrorMessage();
  }

  resetForm() {
    this.editPostFormGroup.reset();
    this.editPostFormGroup.setValue({
      image: new File([], this.post().imgName),
      category: this.post().category,
      species: this.post().species,
      age: this.post().age,
      location: this.post().location,
      status: this.post().status,
    });
  }

  private editStates() {
    var petsStates = this.sheltersService.loggedInShelter().statusCount;
    const oldStatus = this.post().status;

    switch (oldStatus) {
      case 'Adopted':
        petsStates={...petsStates, adoptedCount: petsStates.adoptedCount-1}
        break;
      case 'WaitingForAVisit':
        petsStates={...petsStates, waitingForAVisitCount: petsStates.waitingForAVisitCount-1}
        break;
      case 'Returned':
        petsStates={...petsStates, returnedCount: petsStates.returnedCount-1}
        break;
      case 'WaitingForAdoption':
        petsStates={...petsStates, waitingForAdoptionCount: petsStates.waitingForAdoptionCount-1}
        break;
    }

    const newStatus = this.editPostFormGroup.controls.status.value;
    switch (newStatus) {
      case 'Adopted':
        petsStates={...petsStates, adoptedCount: petsStates.adoptedCount+1}
        break;
      case 'WaitingForAVisit':
        petsStates={...petsStates, waitingForAVisitCount: petsStates.waitingForAVisitCount+1}
        break;
      case 'Returned':
        petsStates={...petsStates, returnedCount: petsStates.returnedCount+1}
        break;
      case 'WaitingForAdoption':
        petsStates={...petsStates, waitingForAdoptionCount: petsStates.waitingForAdoptionCount+1}
        break;
    }

    this.sheltersService.editPetsStates(petsStates);
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

  editPost() {
    this.updateAllErrorMessages();

    if (this.editPostFormGroup.invalid) {
      return false;
    }

    const editedPostData = {
      ...this.editPostFormGroup.value,
      image: this.editPostFormGroup.value.image?.name || '',
    };
    this.postsService.editPost(editedPostData, this.post());
    this.editStates();
    this.openDialog();
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
