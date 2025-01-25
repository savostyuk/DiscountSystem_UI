import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CategoriesTagsService {
  private readonly http = inject(HttpClient);

  getCategoriesTags(): Observable<any> {
    return this.http.get(`${BASE_API_URL}/categories`);
  }

  getCategoryById(categoryId: string | undefined): Observable<any> {
    return this.http.get(`${BASE_API_URL}/categories/${categoryId}`);
  }

  addNewCategory(newCategory: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/categories`, newCategory);
  }

  editCategory(category: any): Observable<any> {
    return this.http.put(`${BASE_API_URL}/categories/${category.id}`, category);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/categories/${id}`);
  }

  addNewTag(newTag: string): Observable<any> {
    return this.http.post(`${BASE_API_URL}/tags`, newTag);
  }

  editTag(tag: any): Observable<any> {
    return this.http.put(`${BASE_API_URL}/tags/${tag.id}`, tag);
  }

  deleteTag(id: string): Observable<any> {
    return this.http.delete(`${BASE_API_URL}/tags/${id}`);
  }

  getTagById(tagId: string | undefined): Observable<any> {
    return this.http.get(`${BASE_API_URL}/tags/${tagId}`);
  }
}
