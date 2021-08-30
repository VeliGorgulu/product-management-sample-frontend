import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Category } from '../models/category';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'https://localhost:44378/api/';

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<ListResponseModel<Category>> {
    let newPath = this.apiUrl + 'categories/getall';
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  add(category: Category): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'categories/add';
    return this.httpClient.post<ResponseModel>(newPath, category);
  }

  update(category: CategoryService):Observable<ResponseModel>{
    let newPath = this.apiUrl + "categories/update"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }

  delete(category:Category):Observable<ResponseModel>{
    let newPath = this.apiUrl + "categories/delete"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }
}
