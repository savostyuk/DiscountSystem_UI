import { Component, inject, input, output } from '@angular/core';
import { VendorsService } from '../../../../services/vendors-service/vendor.service';
import { ModalService } from '../../../../services/modal-service/modal.service';
import { ToasterService } from '../../../../services/toaster-service/toaster.service';
import { TranslateService } from '@ngx-translate/core';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-vendor-card',
  imports: [],
  templateUrl: './vendor-card.component.html',
  styleUrl: './vendor-card.component.scss'
})
export class VendorCardComponent {
  vendorsService = inject(VendorsService);
  private modalService = inject(ModalService);
  private toaster = inject(ToasterService);
  private translateService = inject(TranslateService);

  readonly data = input<any>();
  readonly updateCardsAfterDelete = output();

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
  }

  deleteVendor(): void {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().subscribe((isDelete: boolean) => {
      if (isDelete) {
        this.vendorsService.deleteVendor(this.data().id).pipe(
          tap(() => {
            this.updateCardsAfterDelete.emit();
            this.toaster.open('Information about vendor has been removed', 'success');
          }),
          catchError(() => of(this.toaster.open('Information about vendor hasn\'t been removed')))
        ).subscribe();
      }
    });
  }
}
