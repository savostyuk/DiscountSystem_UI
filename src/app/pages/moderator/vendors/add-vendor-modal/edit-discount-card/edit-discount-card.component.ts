import { Component, computed, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../../../../services/modal-service/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryComponent } from "../../../../../components/category/category.component";
import { TagComponent } from "../../../../../components/tag/tag.component";
import { CommonModule } from '@angular/common';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit-discount-card',
  standalone: true,
  imports: [CategoryComponent, TagComponent, CommonModule],
  templateUrl: './edit-discount-card.component.html',
  styleUrl: './edit-discount-card.component.scss'
})
export class EditDiscountCardComponent {
  dialog = inject(MatDialog);
  private modalService = inject(ModalService);
  private translateService = inject(TranslateService);

  @Input() discountInfo: any;
  @Output() removeDiscountFromVendor: EventEmitter<any> = new EventEmitter();
  dateNow: Date = new Date();
  isOutdatedDiscount = computed(() => {
    return new Date(this.discountInfo.endDate) < this.dateNow ? true : false
  });

  deleteDiscount(): void {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().pipe(
      filter(isDelete => !!isDelete),
      tap(() => this.removeDiscountFromVendor.emit())
    ).subscribe();
  }
}
