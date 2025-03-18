import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPostBriefComponent } from './shelter-post-brief.component';

describe('ShelterPostBriefComponent', () => {
  let component: ShelterPostBriefComponent;
  let fixture: ComponentFixture<ShelterPostBriefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterPostBriefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterPostBriefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
