import { Component, OnInit } from '@angular/core';
import { IProductDetails } from '../model/IProductDetails.model';
import { IStatus } from '../model/IStatus.model';
import { ProductService } from '../service/product.service';
import { UserService } from '../service/user.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent  implements OnInit{
sellerId:number;
  authenticatedUser:boolean;
  constructor(private activatedRoute:ActivatedRoute,private productService:ProductService,private userService:UserService) { 
    
    
    
    this.sellerId=this.userService.getCurrentSeller().userInfo.sellerId;
    console.log(this.sellerId)
  }

  products:IProductDetails[];
  status:IStatus;
  loading:boolean =false;
 
  ngOnInit(){
    this.loading=true;
    this.products= [];
    this.runQuery();
  }
  runQuery(){
    this.loading=true;
    this.products= [];
    this.productService.query(this.sellerId).subscribe(
      res=>{
        console.log(res.data)
        this.loading=false;
        this.products=res.data;
        console.log(this.products)
        this.status=res.status;
      }
    )
  }


}
