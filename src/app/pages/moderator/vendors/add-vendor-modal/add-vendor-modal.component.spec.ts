import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVendorModalComponent } from './add-vendor-modal.component';

describe('AddVendorModalComponent', () => {
  let component: AddVendorModalComponent;
  let fixture: ComponentFixture<AddVendorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVendorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVendorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
