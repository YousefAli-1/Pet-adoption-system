import { Component } from '@angular/core';
import { TilesComponent } from "../shared/tiles/tiles.component";

@Component({
  selector: 'app-dashboard',
  imports: [TilesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
