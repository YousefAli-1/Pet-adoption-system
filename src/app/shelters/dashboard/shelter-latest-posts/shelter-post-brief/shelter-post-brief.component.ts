import { Component, input } from '@angular/core';
import { PostType } from '../../../shelters.model';

@Component({
  selector: 'app-shelter-post-brief',
  imports: [],
  templateUrl: './shelter-post-brief.component.html',
  styleUrl: './shelter-post-brief.component.scss'
})
export class ShelterPostBriefComponent {
  post=input.required<PostType>();

  get petImagePath(){
    return './post-images/'+this.post().imgName;
  }
  get petImageAltText(){
    return this.post().species+' '+this.post().category+'image';
  }
}