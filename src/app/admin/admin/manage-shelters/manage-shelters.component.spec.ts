import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSheltersComponent } from './manage-shelters.component';

describe('ManageSheltersComponent', () => {
  let component: ManageSheltersComponent;
  let fixture: ComponentFixture<ManageSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
