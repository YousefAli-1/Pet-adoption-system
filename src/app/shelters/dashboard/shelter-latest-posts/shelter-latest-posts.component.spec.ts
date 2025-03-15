import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterLatestPostsComponent } from './shelter-latest-posts.component';

describe('ShelterLatestPostsComponent', () => {
  let component: ShelterLatestPostsComponent;
  let fixture: ComponentFixture<ShelterLatestPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterLatestPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterLatestPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
