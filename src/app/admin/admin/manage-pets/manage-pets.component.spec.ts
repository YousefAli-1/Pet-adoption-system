  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePetsComponent } from './manage-pets.component';

describe('ManagePetsComponent', () => {
  let component: ManagePetsComponent;
  let fixture: ComponentFixture<ManagePetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagePetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
