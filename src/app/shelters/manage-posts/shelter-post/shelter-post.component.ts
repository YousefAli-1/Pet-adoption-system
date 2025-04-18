import { Component, DestroyRef, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PostType } from '../../shelters.model';
import { RouterLink } from '@angular/router';
import { PostsService } from '../../../posts.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-shelter-post',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './shelter-post.component.html',
  styleUrl: './shelter-post.component.scss',
})
export class ShelterPostComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef=inject(DestroyRef);
  private postsService = inject(PostsService);
  post = input.required<PostType>();

  get petImagePath() {
    return this.post().imgName;
  }
  get petImageAltText() {
    return this.post().species + ' ' + this.post().category + "'s image";
  }
  deletePost() {
    const subscribtion=this.dialog
      .open(ConfirmDeleteDialogComponent, {
        width: '250px',
        enterAnimationDuration: '0ms',
        exitAnimationDuration: '0ms',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.postsService.deletePost(this.post().ID);
        }
      });

    this.destroyRef.onDestroy(()=>{
      subscribtion.unsubscribe();
    });
  }
}
