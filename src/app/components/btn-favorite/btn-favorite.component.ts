import { Component, Input } from '@angular/core';
import { FavoritesService } from '../../services/favorites-service/favorites.service';
import { ToasterService } from '../../services/toaster-service/toaster.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-btn-favorite',
  imports: [],
  templateUrl: './btn-favorite.component.html',
  styleUrl: './btn-favorite.component.scss'
})
export class BtnFavoriteComponent {
  @Input() isFavorite: boolean | undefined;
  @Input() id: string = '';

  constructor(public favoriteService: FavoritesService,
    private toaster: ToasterService) { }

  addFavorite(): void {
    this.favoriteService.addFavorite(this.id).pipe(
      tap(() => {
        this.toaster.open('Discount has been added to favorites', 'success');
      }),
      catchError(() => of(this.toaster.open('Discount can not be added to favorites')))
    ).subscribe();
  }

  deleteFavorite(): void {
    this.favoriteService.deleteFavorite(this.id).pipe(
      tap(() => {
        this.toaster.open('Discount has been removed from favorites', 'success');
      }),
      catchError(() => of(this.toaster.open('Discount can not be removed from favorites')))
    ).subscribe();
  }

  changeFavorite(event: Event): void {
    this.isFavorite = !this.isFavorite;
    event.stopPropagation();
    this.isFavorite ? this.addFavorite() : this.deleteFavorite();
  }
}
