import { Component, inject, input, signal } from '@angular/core';
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
  favoriteService = inject(FavoritesService);
  private toaster = inject(ToasterService);

  readonly isFavorite = input<boolean>();
  readonly id = input<string>('');

  favorite = signal<boolean>(false);

  ngOnInit() {
    this.favorite.set(this.isFavorite()!);
  }

  addFavorite(): void {
    this.favoriteService.addFavorite(this.id()).pipe(
      tap(() => {
        this.toaster.open('Discount has been added to favorites', 'success');
      }),
      catchError(() => of(this.toaster.open('Discount can not be added to favorites')))
    ).subscribe();
  }

  deleteFavorite(): void {
    this.favoriteService.deleteFavorite(this.id()).pipe(
      tap(() => {
        this.toaster.open('Discount has been removed from favorites', 'success');
      }),
      catchError(() => of(this.toaster.open('Discount can not be removed from favorites')))
    ).subscribe();
  }

  changeFavorite(event: Event): void {
    this.favorite() ? this.favorite.set(false) : this.favorite.set(true);
    event.stopPropagation();
    this.favorite() ? this.addFavorite() : this.deleteFavorite();
  }
}
