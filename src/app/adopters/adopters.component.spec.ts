import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptersComponent } from './adopters.component';

describe('AdoptersComponent', () => {
  let component: AdoptersComponent;
  let fixture: ComponentFixture<AdoptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
