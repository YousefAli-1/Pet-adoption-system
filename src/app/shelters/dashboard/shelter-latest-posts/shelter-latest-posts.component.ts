import { Component, signal } from '@angular/core';
import { CardComponent } from "../../shared/card/card.component";
import { PostType } from '../../shelters.model';
import { ShelterPostBriefComponent } from "./shelter-post-brief/shelter-post-brief.component";
import { posts } from './dummy-posts';

@Component({
  selector: 'app-shelter-latest-posts',
  imports: [CardComponent, ShelterPostBriefComponent],
  templateUrl: './shelter-latest-posts.component.html',
  styleUrl: './shelter-latest-posts.component.scss'
})
export class ShelterLatestPostsComponent {
  latestPosts= signal<PostType[]>(posts);
}