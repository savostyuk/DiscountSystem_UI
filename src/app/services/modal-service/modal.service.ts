import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { IVendor } from '../../models/vendor.interface';
import { AddVendorModalComponent } from '../../pages/moderator/vendors/add-vendor-modal/add-vendor-modal.component';
import { IDiscount } from '../../models/discount.interface';
import { AddDiscountModalComponent } from '../../pages/moderator/vendors/add-discount-modal/add-discount-modal.component';
import { DiscountDetailsModalComponent } from '../../pages/discounts/discount-details-modal/discount-details-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  openConfirmModal(data?: any): any {
    return this.dialog.open(ConfirmationDialogComponent, {
      data,
      panelClass: 'confirm-modal',
      backdropClass: 'confirm-modal-backdrop',
    });
  }

  openVendorModal(data?: IVendor): any {
    return this.dialog.open(AddVendorModalComponent, {
      data: data ? data : {},
      panelClass: 'vendor-details-modal',
      backdropClass: 'vendor-details-modal-backdrop',
      maxWidth: '66rem',
      autoFocus: false,
      disableClose: true,
    });
  }

  openAddDiscountModal(discount?: IDiscount, index?: any, vendor?: IVendor): any {
    return this.dialog.open(AddDiscountModalComponent, {
      data: {
        discount: discount || {},
        indexForLabel: index + 1 || '',
      },
      panelClass: 'add-discount-modal',
      backdropClass: 'add-discount-modal-backdrop',
      maxWidth: '33rem',
      autoFocus: false,
      disableClose: true,
    });
  }

  openDiscountDetailsModal(id: string, isVisibleEditNote?: boolean, note?: string): any {
    return this.dialog.open(DiscountDetailsModalComponent, {
      data: {
        id,
        isVisibleEditNote,
        note
      },
      maxWidth: '33rem',
      panelClass: 'discount-details-modal',
      backdropClass: 'discount-details-modal-backdrop',
      autoFocus: false,
      disableClose: true,
    });
  }
}
