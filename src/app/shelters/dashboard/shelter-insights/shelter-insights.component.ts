import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ShelterType } from '../../shelters.model';


@Component({
  selector: 'app-shelter-insights',
  imports: [ChartModule],
  templateUrl: './shelter-insights.component.html',
  styleUrl: './shelter-insights.component.scss',
})
export class ShelterInsightsComponent implements OnInit {

  shelter=signal<ShelterType>({
    name: 'Zee Animal',
    statusCount:{
      adoptedCount: 10,
      waitingForAVisitCount: 4,
      returnedCount: 1,
      waitingForAdoptionCount: 15
    }
  });
  data: Signal<any>=signal({});

  options: any;

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.InitChart();
  }
  InitChart() : void {
    if (isPlatformBrowser(this.platformId)) {

      this.data = computed(()=>{
        return {
        labels: ['Adopted','Waiting for a visit','Returned','Waiting for adoption'],
        datasets: [
          {
            data: [this.shelter().statusCount.adoptedCount, this.shelter().statusCount.waitingForAVisitCount, this.shelter().statusCount.returnedCount, this.shelter().statusCount.waitingForAdoptionCount],
            backgroundColor: [
              ' #fc6300 ', ' #fe912a ', '  #625f5e  ', '  #303030  '
            ],
            hoverBackgroundColor: [
              'rgba(252, 101, 0, 0.9) ', 'rgba(254, 144, 42, 0.9) ', 'rgba(98, 95, 94, 0.9)  ', 'rgba(48, 48, 48, 0.9)  '
            ],
          },
        ],
      }});
      
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: '#333',
            },
          },
        },
      };
    }
  }
}