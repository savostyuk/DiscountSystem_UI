import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorCardComponent } from './vendor-card.component';

describe('VendorCardComponent', () => {
  let component: VendorCardComponent;
  let fixture: ComponentFixture<VendorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
