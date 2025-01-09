import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CategoryComponent } from "../category/category.component";
import { TagComponent } from "../tag/tag.component";
import { MatIconModule } from '@angular/material/icon';
import { IDiscount } from '../../models/discount.interface';

@Component({
  selector: 'app-discount-card',
  standalone: true,
  imports: [CommonModule, CategoryComponent, TagComponent, MatIconModule],
  templateUrl: './discount-card.component.html',
  styleUrl: './discount-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class DiscountCardComponent {
  @Input() discount!: IDiscount;
}
