
import { Component, computed, signal, ViewEncapsulation, input } from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { TagComponent } from "../tag/tag.component";
import { MatIconModule } from '@angular/material/icon';
import { IDiscount } from '../../models/discount.interface';
import { BtnFavoriteComponent } from "../btn-favorite/btn-favorite.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-discount-card',
  standalone: true,
  imports: [CategoryComponent, TagComponent, MatIconModule, BtnFavoriteComponent, TranslateModule],
  templateUrl: './discount-card.component.html',
  styleUrl: './discount-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DiscountCardComponent {
  readonly discount = input.required<IDiscount>();
  dateNow: Date = new Date();
  isFutureDiscount = computed(() => {
    return new Date(this.discount().startDate) > this.dateNow ? true : false
  });
}
