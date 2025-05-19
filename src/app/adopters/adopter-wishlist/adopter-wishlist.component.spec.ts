import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdopterWishlistComponent } from './adopter-wishlist.component';

describe('AdopterWishlistComponent', () => {
  let component: AdopterWishlistComponent;
  let fixture: ComponentFixture<AdopterWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdopterWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdopterWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
