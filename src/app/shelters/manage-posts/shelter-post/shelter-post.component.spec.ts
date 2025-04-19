import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterPostComponent } from './shelter-post.component';

describe('ShelterPostComponent', () => {
  let component: ShelterPostComponent;
  let fixture: ComponentFixture<ShelterPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
