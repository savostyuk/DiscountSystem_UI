import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiscountCardComponent } from './edit-discount-card.component';

describe('EditDiscountCardComponent', () => {
  let component: EditDiscountCardComponent;
  let fixture: ComponentFixture<EditDiscountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDiscountCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiscountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
