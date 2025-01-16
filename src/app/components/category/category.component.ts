
import { Component, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { CategoriesTagsService } from '../../services/categories-tags-service/categories-tags.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-category',
  imports: [],
  standalone: true,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent {
  private readonly categoriesTagsService = inject(CategoriesTagsService);
  categoryId = input<string>('');
  name = input<string>('');
  public categoryName = signal('');

  ngOnInit() {
    if (!this.name()) {
      this.getCategoryName();
    } else {
      this.categoryName.set(this.name());
    }
  }

  getCategoryName(): void {
    this.categoriesTagsService.getCategoryById(this.categoryId()).pipe(
      tap((data) => this.categoryName.set(data.categoryName))
    ).subscribe();
  }
}
