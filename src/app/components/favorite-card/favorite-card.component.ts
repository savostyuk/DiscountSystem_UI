import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { TagComponent } from "../tag/tag.component";
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/modal-service/modal.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FavoritesService } from '../../services/favorites-service/favorites.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-favorite-card',
  imports: [CategoryComponent, TagComponent, CommonModule],
  templateUrl: './favorite-card.component.html',
  styleUrl: './favorite-card.component.scss'
})
export class FavoriteCardComponent {
  @Input() favoriteInfo: any;
  @Output() updateCardsAfterDelete: EventEmitter<any> = new EventEmitter();

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
        this.favoriteService.deleteFavorite(this.favoriteInfo.discountId).pipe(
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
