import { Component, ViewEncapsulation, inject } from '@angular/core';
import { DiscountsService } from '../../../services/discounts-service/discounts.service';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { FavoritesService } from '../../../services/favorites-service/favorites.service';
import { ModalService } from '../../../services/modal-service/modal.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isEqual } from 'lodash';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnFavoriteComponent } from "../../../components/btn-favorite/btn-favorite.component";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from "../../../components/category/category.component";
import { TagComponent } from "../../../components/tag/tag.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-discount-details-modal',
  standalone: true,
  imports: [TranslateModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    BtnFavoriteComponent,
    CategoryComponent,
    TagComponent,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule],
  templateUrl: './discount-details-modal.component.html',
  styleUrl: './discount-details-modal.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DiscountDetailsModalComponent {
  private discountService = inject(DiscountsService);
  private toaster = inject(ToasterService);
  private favoriteService = inject(FavoritesService);
  private modalService = inject(ModalService);
  private translateService = inject(TranslateService);
  private matDialogRef = inject<MatDialogRef<any>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  discountDetails: any;
  discountId: string = '';
  isFutureDiscount: boolean;
  dateNow: Date;
  editingValueControl = new FormControl();

  constructor() {
    this.discountDetails = {
      tags: [],
    };
    this.isFutureDiscount = false;
    this.dateNow = new Date();
  }

  ngOnInit(): void {
    this.matDialogRef.backdropClick().subscribe(() => {
      this.checkChanges();
    });
    this.discountId = this.data.id;
    this.discountService.getDiscountDetails(this.discountId).subscribe(
      (data) => {
        this.discountDetails = data;
        if (new Date(this.discountDetails.startDate) > this.dateNow) {
          this.isFutureDiscount = true;
        };
        this.editingValueControl = new FormControl(this.discountDetails.note, [Validators.maxLength(255)]);
      },
      () => {
        this.toaster.open('Can not get discountId');
      }
    );
  }

  checkChanges(): any {
    const confirmData = {
      message: this.translateService.instant('confirmation.change.message'),
      buttonPositive: this.translateService.instant('confirmation.change.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.change.button-negative'),
    };

    if (this.data.isVisibleEditNote && this.data.note != this.editingValueControl.value) {
      const dialogRef = this.modalService.openConfirmModal(confirmData);

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.matDialogRef.close('');
        }
      });
    } else {
      this.matDialogRef.close('');
    }
  }

  submitEditNote(): void {
    this.favoriteService.updateFavorite(this.discountId, this.editingValueControl.value).subscribe(
      () => {
        this.toaster.open('Information has been updated', 'success');
        this.matDialogRef.close(this.discountId);
      },
      (error) => {
        const errorMessage = error.error.errors.hasOwnProperty('Note') ? error.error.errors.Note[0] : 'Information hasn\'t been updated';
        this.toaster.open(errorMessage);
      }
    );
  }

  canNotBeSaved(): boolean {
    return isEqual(this.editingValueControl.value, this.data.note);
  }
}
