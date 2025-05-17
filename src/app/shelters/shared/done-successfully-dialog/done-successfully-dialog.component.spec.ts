import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneSuccessfullyDialogComponent } from './done-successfully-dialog.component';

describe('DoneSuccessfullyDialogComponent', () => {
  let component: DoneSuccessfullyDialogComponent;
  let fixture: ComponentFixture<DoneSuccessfullyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoneSuccessfullyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoneSuccessfullyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
