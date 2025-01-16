import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountDetailsModalComponent } from './discount-details-modal.component';

describe('DiscountDetailsModalComponent', () => {
  let component: DiscountDetailsModalComponent;
  let fixture: ComponentFixture<DiscountDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscountDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
