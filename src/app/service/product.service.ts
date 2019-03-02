import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IProductDetails } from '../model/IProductDetails.model';
import { IStatus } from '../model/IStatus.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private userService:UserService,private apiService:ApiService) { }

  query(sellerId):Observable<{data:IProductDetails[],status:IStatus}>{
    console.log(this.userService.getCurrentSeller())
   
    console.log(sellerId);
    return this.apiService.get('/sellers/'+sellerId+'/products');
  }

  getProduct(sellerId,productId):Observable<{data:IProductDetails,status:IStatus}>{
    console.log(sellerId,productId);
    return this.apiService.get('/sellers/'+sellerId+'/products/'+productId);
  }

  addProduct(sellerId,newProduct:IProductDetails){
    console.log(newProduct);
    if (newProduct.productId!=0) {
      return this.apiService.put('/products/'+newProduct.productId, {user: newProduct});
        

    }else{    return this.apiService.post('/sellers/'+sellerId+'/products',{user:newProduct});
  }
}
}
