import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { ProductService } from '../service/product.service';
import { IProductDetails } from '../model/IProductDetails.model';
import { IStatus } from '../model/IStatus.model';
import { IProductImage } from '../model/IProductImage.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
productId:number;
sellerId:number;
product:IProductDetails;
status:IStatus;
isLoaded:boolean;
productImages:IProductImage[]=[];
  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,private productService:ProductService) {
    this.productId = this.activatedRoute.snapshot.params['productId'];
    this.sellerId=this.userService.getCurrentSeller().userInfo.sellerId;
    console.log(this.productId,this.sellerId);
    this.isLoaded=false;
   }

  ngOnInit() {
    this.productService.getProduct(this.sellerId,this.productId).subscribe(
      res=>{
        this.isLoaded=true;
        console.log(res);
       
      this.product=res.data;
      this.productImages=res.data.productImages;
      this.status=res.status;
      }
    )
  }

}
