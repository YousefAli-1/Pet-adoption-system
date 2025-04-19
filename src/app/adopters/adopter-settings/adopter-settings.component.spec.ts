import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterSettingsComponent } from './adopter-settings.component';

describe('AdopterSettingsComponent', () => {
  let component: AdopterSettingsComponent;
  let fixture: ComponentFixture<AdopterSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdopterSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdopterSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
