import { Component, inject, signal } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { PostType } from '../../shelters.model';
import { ShelterPostBriefComponent } from "./shelter-post-brief/shelter-post-brief.component";
import { SheltersService } from '../../shelters.service';
import { PostsService } from '../../../posts.service';

@Component({
  selector: 'app-shelter-latest-posts',
  imports: [CardComponent, ShelterPostBriefComponent],
  templateUrl: './shelter-latest-posts.component.html',
  styleUrl: './shelter-latest-posts.component.scss'
})
export class ShelterLatestPostsComponent {
  private sheltersService=inject(SheltersService);
  private postsService= inject(PostsService);

  latestPosts= this.postsService.getlatestShelterPosts(this.sheltersService.loggedInShelter().email, 10);
}