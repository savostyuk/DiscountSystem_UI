import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { VendorsService } from '../../../../services/vendors-service/vendor.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { cloneDeep, forEach, isEqual } from 'lodash';
import { IDiscount } from '../../../../models/discount.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditDiscountCardComponent } from "./edit-discount-card/edit-discount-card.component";
import { IVendorCard } from '../../../../models/vendor-card.interface';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DiscountsService } from '../../../../services/discounts-service/discounts.service';

@Component({
  selector: 'app-add-vendor-modal',
  imports: [TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    ReactiveFormsModule,
    EditDiscountCardComponent,
    CommonModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './add-vendor-modal.component.html',
  styleUrl: './add-vendor-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class AddVendorModalComponent {
  vendor: any = {};
  pristineVendor: any = {};
  vendorName = new FormControl('', [Validators.required, Validators.maxLength(100)]);

  constructor(public vendorsService: VendorsService,
    public dialog: MatDialog,
    private modalService: ModalService,
    private toaster: ToasterService,
    private matDialogRef: MatDialogRef<any>,
    private translateService: TranslateService,
    private discountsService: DiscountsService,
    @Inject(MAT_DIALOG_DATA) public vendorId: IVendorCard
  ) {}

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });

    this.getVendorDetails();
  }

  getVendorDetails(): void {
    if (this.vendorId.id) {
      this.vendorsService.getVendorDetails(this.vendorId.id).pipe(
        tap((data) => {
          this.vendor = data;
          this.pristineVendor = cloneDeep(this.vendor);
        }),
        catchError(() => of(this.toaster.open('Сan not get vendorId')))
      ).subscribe();
    }
  }

  openDiscountModal(discount?: IDiscount, index?: any): void {
    const dialogRef = this.modalService.openAddDiscountModal(discount, index, this.vendor);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        data.vendorId = this.vendor.id;
        data.id
          ? this.discountsService.updateDiscount(data).pipe(finalize(() => this.getVendorDetails())).subscribe()
          : this.discountsService.addDiscount(data).pipe(finalize(() => this.getVendorDetails())).subscribe();
      }
    });
  }

  checkChanges(): void {
    if (isEqual(this.vendor.id, undefined)) {
      this.pristineVendor.name = undefined;
    }

    const isChanged = isEqual(this.pristineVendor, this.vendor);
    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (!isChanged) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  changeDates(date: any): string {
    const objDateString = date.toString();
    const month = (date.getMonth() + 1).toString().length === 1 ?
      `0${(date.getMonth() + 1).toString()}` :
      (date.getMonth() + 1).toString();

    return `${objDateString.slice(11, 15)}-` + month + `-${objDateString.slice(8, 10)}T00:00:00Z`;
  }

  addUpdateNewVendor(): void {
    const vendorCopy = cloneDeep(this.vendor);

    forEach(vendorCopy.discounts, item => {
      if (item.startDate && typeof (item.startDate) !== 'string') {
        item.startDate = this.changeDates(item.startDate);
      }
      if (item.endDate && typeof (item.endDate) !== 'string') {
        item.endDate = this.changeDates(item.endDate);
      }
    });

    if (vendorCopy.id) {
      this.vendorsService.updateVendor(vendorCopy).pipe(
        tap(() => {
          this.toaster.open('Vendor was updated', 'success');
          this.matDialogRef.close(vendorCopy);
        }),
        catchError((error) => {
          let errorMessage = '';
          if (error.error.errors.hasOwnProperty('VendorName')) {
            errorMessage += `${error.error.errors.VendorName[0]} `
          } else {
            errorMessage = 'Couldn\`t update vendor';
          }
          this.toaster.open(errorMessage);
          return of();
        })
      ).subscribe();
    } else {
      this.vendorsService.addVendor(vendorCopy).pipe(
        tap(        () => {
          this.toaster.open('New vendor has been added', 'success');
          this.matDialogRef.close(vendorCopy);
        }),
        catchError((error) => {
          let errorMessage = '';
          if (error.error.errors.hasOwnProperty('VendorName')) {
            errorMessage += `${error.error.errors.VendorName[0]} `
          } else {
            errorMessage = 'There is no possibility to add a new vendor';
          }
          this.toaster.open(errorMessage);
          return of();
        })
      ).subscribe();
    }
  }

  deleteDiscount(id: string): void {
    this.discountsService.deleteDiscount(id).pipe(
      finalize(() => this.getVendorDetails())
    ).subscribe();
  }

  canNotBeSaved(): boolean {
    return isEqual(this.vendor, this.pristineVendor);
  }

  isSaveDisabled(): boolean {
    return !this.vendor.vendorName;
  }
}
