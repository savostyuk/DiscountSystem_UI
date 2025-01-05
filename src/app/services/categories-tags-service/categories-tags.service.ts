import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API_URL } from '../../global';

@Injectable({
  providedIn: 'root'
})
export class CategoriesTagsService {

  constructor(private readonly http: HttpClient) { }

  getCategoriesTags(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', 'application/json');

    return this.http.get(`${BASE_API_URL}/categories`, { headers });
  }

  addNewCategory(newCategory: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', `application/json`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/categories`, newCategory, { headers });
  }

  editCategory(category: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${BASE_API_URL}/categories/${category.id}`, category, { headers });
  }

  deleteCategory(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.delete(`${BASE_API_URL}/categories/${id}`, { headers });
  }

  addNewTag(newTag: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', `application/json`);
    headers = headers.append('accept', '*/*');

    return this.http.post(`${BASE_API_URL}/tags`, newTag, { headers });
  }

  editTag(tag: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${BASE_API_URL}/tags/${tag.id}`, tag, { headers });
  }

  deleteTag(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('accept', '*/*');

    return this.http.delete(`${BASE_API_URL}/tags/${id}`, { headers });
  }
}
