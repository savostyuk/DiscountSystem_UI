import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { forEach, isEqual, find, cloneDeep } from 'lodash';
import { ToasterService } from '../../../services/toaster-service/toaster.service';
import { ICategory } from '../../../models/category.interface';
import { ITag } from '../../../models/tag.interface';
import { CategoriesTagsService } from '../../../services/categories-tags-service/categories-tags.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListInputComponent } from "./list-input/list-input.component";
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  imports: [TranslateModule,
    MatFormFieldModule,
    ListInputComponent,
    FormsModule,
    MatOptionModule,
    CommonModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  private readonly categoriesTagsService = inject(CategoriesTagsService);
  private readonly toaster = inject(ToasterService);
  categoriesAll: ICategory[] = [];
  tagsAll: ITag[] = [];
  categoryObj: any;
  tagObj: any;
  activeCategoryId: string = '';
  tagsAllCopy: any;
  isDisabled: boolean = true;

  ngOnInit(): void {
    this.getAllCategoriesAndTags();
  }

  getAllCategoriesAndTags(): void {
    this.categoriesTagsService.getCategoriesTags().pipe(
      tap((data) => {
        data.map((category: any) => { category.name = category.categoryName });
        if (!(find(data, (item: any) => isEqual(item.id, this.activeCategoryId)))) {
          this.activeCategoryId = data[0].id;
        }
        this.categoriesAll = data;
        forEach(data, (category: any) => {
          forEach(category.tags, (tag: any) => {
            this.tagsAll.push({
              categoryId: tag.categoryId,
              name: tag.tagName,
              id: tag.id
            });
            this.tagsAllCopy = cloneDeep(this.tagsAll);
          });
        });
        this.showTagsList();
      }),
      catchError(() => of(this.toaster.open('Сan not get categories and tags')))
    ).subscribe();
  }

  addCategory(categoryName: string, reload: any): void {
    this.categoryObj = {};
    this.categoryObj.CategoryName = categoryName;
    this.categoriesTagsService.addNewCategory(this.categoryObj).pipe(
      tap(() => {
        this.toaster.open('New category has been added', 'success');
        reload.emit();
      }),
      catchError((error: any) => {
        const errorMessage = error.error.errors.hasOwnProperty('CategoryName')
          ? error.error.errors.CategoryName[0]
          : 'There is no possibility to add a new category';
        this.toaster.open(errorMessage);
        return of();
      })).subscribe();
  }

  addTag(tagName: string, reload: any): void {
    this.tagObj = {};
    this.tagObj.categoryId = this.activeCategoryId;
    this.tagObj.tagName = tagName;
    this.categoriesTagsService.addNewTag(this.tagObj).pipe(
      tap(() => {
        this.toaster.open('New tag has been added', 'success');
        reload.emit();
      }),
      catchError((error: any) => {
        const errorMessage = error.error.errors.hasOwnProperty('TagName')
          ? error.error.errors.TagName[0]
          : 'There is no possibility to add a new tag';
        this.toaster.open(errorMessage);
        return of()
      })).subscribe();
  }

  deleteCategory(categoryId: string, reload: any): void {
    this.categoriesTagsService.deleteCategory(categoryId).pipe(
      tap(() => {
        this.toaster.open('Category has been deleted', 'success');
        reload.emit();
      }),
      catchError((error: any) => {
        const errorMessage = error.error
          ? error.error
          : 'There is no possibility to delete this category';
        this.toaster.open(errorMessage);
        return of();
      })).subscribe();
  }

  deleteTag(tagId: string, reload: any): void {
    this.categoriesTagsService.deleteTag(tagId).pipe(
      tap(() => {
        this.toaster.open('Tag has been deleted', 'success');
        reload.emit();
      }),
      catchError(() => of(this.toaster.open('There is no possibility to delete this tag'))
      )).subscribe();
  }

  editCategory(category: ICategory, reload: any): void {
    category.categoryName = category.name;
    this.categoriesTagsService.editCategory(category).pipe(
      tap(() => {
        this.toaster.open('Category has been changed', 'success');
        reload.emit();
      }),
      catchError((error) => {
        const errorMessage = error.error.errors.hasOwnProperty('CategoryName')
          ? error.error.errors.CategoryName[0]
          : 'There is no possibility to change this category';
        this.toaster.open(errorMessage);
        return of();
      })).subscribe();
  }

  editTag(tag: ITag, reload: any): void {
    tag.tagName = tag.name;
    this.categoriesTagsService.editTag(tag).pipe(
      tap(() => {
        this.toaster.open('Tag has been changed', 'success');
        reload.emit();
      }),
      catchError((error) => {
        const errorMessage = error.error.errors.hasOwnProperty('TagName')
          ? error.error.errors.TagName[0]
          : 'There is no possibility to change this tag';
        this.toaster.open(errorMessage);
        return of();
      })
    ).subscribe();
  }

  onChangeData(): void {
    this.tagsAll = [];
    this.getAllCategoriesAndTags();
  }



  showTagsList(): void {
    if (this.activeCategoryId) {
      this.tagsAll = [];
      this.isDisabled = false;
      forEach(this.categoriesAll, (category: any) => {
        if (isEqual(this.activeCategoryId, category.id)) {
          forEach(category.tags, (tag: any) => {
            this.tagsAll.push({
              categoryId: tag.categoryId,
              name: tag.tagName,
              id: tag.id
            });
            this.tagsAllCopy = cloneDeep(this.tagsAll);
          });
        }
      });
    } else {
      this.isDisabled = true;
      this.tagsAll = cloneDeep(this.tagsAllCopy);
    }
  }
}
