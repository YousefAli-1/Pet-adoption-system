import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PostType } from '../../shelters.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shelter-post',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './shelter-post.component.html',
  styleUrl: './shelter-post.component.scss',
})
export class ShelterPostComponent {
  post = input.required<PostType>();

  get petImagePath() {
    return this.post().imgName;
  }
  get petImageAltText() {
    return this.post().species + ' ' + this.post().category + "'s image";
  }
}
