import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal-service/modal.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { GridService } from '../../../services/grid-service/grid.service';
import { VendorsService } from '../../../services/vendors-service/vendors.service';
import { forEach } from 'lodash';
import { IVendor } from '../../../models/vendor.interface';
import { VendorCardComponent } from "./vendor-card/vendor-card.component";
import { AddVendorCardComponent } from "./add-vendor-card/add-vendor-card.component";
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [VendorCardComponent, AddVendorCardComponent, MatGridListModule, CommonModule],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class VendorsComponent {
  vendors: IVendor[] = [];
  breakpoint: number = 0;

  constructor(public dialog: MatDialog,
    private modalService: ModalService,
    private vendorsService: VendorsService,
    private toaster: ToasterService,
    private gridService: GridService) {
  }

  ngOnInit(): void {
    this.breakpoint = this.gridService.getDiscountGrid(window.innerWidth);
    this.getAllVendors();
  }

  openVendorModal(data?: IVendor): void {
    const dialogRef = this.modalService.openVendorModal(data);

    dialogRef.afterClosed().subscribe((dataVendor: any) => {
      if (dataVendor) {
        this.vendors = [];
        this.getAllVendors();
      }
    });
  }

  getAllVendors(): void {
    this.vendorsService.getVendors().pipe(
      tap((data) => {
        forEach(data, (vendor: IVendor) => {
          this.vendors.push(vendor);
        });
      }),
      catchError(() => of(this.toaster.open('Information about vendors hasn\'t been received')))
    ).subscribe();
  }

  getAllVendorsAfterDelete(): void {
    this.vendors = [];
    this.getAllVendors();
  }

  onResize(event: any): void {
    this.breakpoint = this.gridService.getDiscountGrid(event.target.innerWidth);
  }
}
