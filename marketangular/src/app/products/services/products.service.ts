import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  constructor(private httpClient : HttpClient) { }

  getAllProducts() : Observable<any>{
    return this.httpClient.get(environment.baseApi + "products");
  }

  getAllCategories(){
    return this.httpClient.get(environment.baseApi + "products/categories");
  }

  getProductByCategory(keyword : string){
    return this.httpClient.get(environment.baseApi + "products/category/" + keyword);
  }

  getProductById(id : any){
    return this.httpClient.get(environment.baseApi + "products/" + id);
  }
}
