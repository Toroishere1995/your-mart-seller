import { Injectable } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { UserService } from '../service/user.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IProductDetails } from '../model/IProductDetails.model';

@Injectable({
  providedIn: 'root'
})
export class EditableProductResolverService implements Resolve<IProductDetails> {
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    
    return this.productService.getProduct(this.userService.getCurrentSeller().userInfo.sellerId,route.params['productId'])
      .pipe(
        map(
          res => {
            if(res.status.statusMessage !='ERROR'){
            if (this.userService.getCurrentSeller().token) {
              console.log(res);
              return res.data;
            } 
          }else {
              this.router.navigateByUrl('/');
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}