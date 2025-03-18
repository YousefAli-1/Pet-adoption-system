//Angular
import { Component } from '@angular/core';

//Inner Components
import { TilesComponent } from '../shared/tiles/tiles.component';
import { ShelterInsightsComponent } from './shelter-insights/shelter-insights.component';
import { ShelterLatestPostsComponent } from './shelter-latest-posts/shelter-latest-posts.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    TilesComponent,
    ShelterInsightsComponent,
    ShelterLatestPostsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}