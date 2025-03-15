//Angular
import { Component } from '@angular/core';

//Angular Material Modules
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

//Inner Components
import { TilesComponent } from '../shared/tiles/tiles.component';
import { ShelterInsightsComponent } from './shelter-insights/shelter-insights.component';
import { ShelterLatestPostsComponent } from './shelter-latest-posts/shelter-latest-posts.component';
import { RouterLink } from '@angular/router';

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