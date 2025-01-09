import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorCardComponent } from './add-vendor-card.component';

describe('AddVendorCardComponent', () => {
  let component: AddVendorCardComponent;
  let fixture: ComponentFixture<AddVendorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVendorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
