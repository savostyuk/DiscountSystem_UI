import { Component } from '@angular/core';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { IDiscount } from '../../models/discount.interface';
import { FavoritesService } from '../../services/favorites-service/favorites.service';
import { FavoriteCardComponent } from "../../components/favorite-card/favorite-card.component";

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalService } from '../../services/modal-service/modal.service';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteCardComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  favoriteCards: Array<IDiscount> = [];

  constructor(private favoritesService: FavoritesService,
    private toaster: ToasterService,
    private modalService: ModalService) {
    this.getFavorites();
  }

  getFavorites(): void {
    this.favoritesService.getFavorites().pipe(
      tap((data) => this.favoriteCards = data),
      catchError(() => of(this.toaster.open('Сan not get favorites')))
    ).subscribe();
  }

  getFavoritesAfterDelete(): void {
    this.favoriteCards = [];
    this.getFavorites();
  }

  openDiscountDetailModal(favoriteCard: any): void {
    const dialogRef = this.modalService.openDiscountDetailsModal(favoriteCard.id, true, favoriteCard.note);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.favoriteCards = [];
        this.getFavorites();
      }
    });
  }
}
