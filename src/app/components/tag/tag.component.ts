import { Component, Input, signal, inject } from '@angular/core';
import { CategoriesTagsService } from '../../services/categories-tags-service/categories-tags.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  private categoryService = inject(CategoriesTagsService);

  @Input() tagId?: string | undefined;
  tagName = signal('');

  ngOnInit() {
    this.getTagName();
  }

  getTagName(): void {
    this.categoryService.getTagById(this.tagId).pipe(
      tap((data) => this.tagName.set(data.tagName))
    ).subscribe();
  }
}
