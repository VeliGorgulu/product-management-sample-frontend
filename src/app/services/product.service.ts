import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'https://localhost:44378/api/';

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getall"
    return this.httpClient.get<ListResponseModel<Product>>(newPath)
  }

  getProductsByCategory(id:number):Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getallbycategoryid?categoryId=" + id
    return this.httpClient.get<ListResponseModel<Product>>(newPath)
  }

  add(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl + "products/add"
    return this.httpClient.post<ResponseModel>(newPath, product)
  }

  delete(product:Product):Observable<ResponseModel>{
    let newPath = this.apiUrl + "products/delete"
    return this.httpClient.post<ResponseModel>(newPath, product)
  }

  update(product:ProductService):Observable<ResponseModel>{
    let newPath = this.apiUrl + "products/update"
    return this.httpClient.post<ResponseModel>(newPath, product)
  }
}
