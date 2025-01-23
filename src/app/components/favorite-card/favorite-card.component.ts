import { Component, computed, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { TagComponent } from "../tag/tag.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service/modal.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites-service/favorites.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IDiscount } from '../../models/discount.interface';

@Component({
  selector: 'app-favorite-card',
  imports: [CategoryComponent, TagComponent, CommonModule, TranslateModule],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class FavoriteCardComponent {
  @Input() discount!: IDiscount;
  @Output() updateCardsAfterDelete: EventEmitter<any> = new EventEmitter();
  dateNow: Date = new Date();
  isFutureDiscount = computed(() => {
    return new Date(this.discount.startDate) > this.dateNow ? true : false
  });
  isOutdatedDiscount = computed(() => {
    return new Date(this.discount.endDate!) < this.dateNow ? true : false
  });

  constructor(public dialog: MatDialog,
    private modalService: ModalService,
    private favoriteService: FavoritesService,
    private toaster: ToasterService,
    private translateService: TranslateService) { }

  deleteFavorite(): void {
    const confirmData = {
      message: this.translateService.instant('confirmation.delete.message'),
      buttonPositive: this.translateService.instant('confirmation.delete.button-positive'),
      buttonNegative: this.translateService.instant('confirmation.delete.button-negative'),
    };
    const dialogRef = this.modalService.openConfirmModal(confirmData);

    dialogRef.afterClosed().subscribe((isDelete: any) => {
      if (isDelete) {
        this.favoriteService.deleteFavorite(this.discount.id).pipe(
          tap(() => {
            this.updateCardsAfterDelete.emit();
            this.toaster.open('Discount has been removed from favorites', 'success');
          }),
          catchError(() => of(this.toaster.open('Discount can not be removed from favorites')))
        ).subscribe();
      }
    });
  }
}
