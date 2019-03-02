import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ISellerInformation } from '../model/ISellerInformation.model';
import { SellerService } from '../service/seller.service';
import { IStatus } from '../model/IStatus.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router:Router,
    private userService:UserService,
    private sellerService:SellerService,
  ) {
    this.userService.isAuthenticated.subscribe(
      (authenticated)=>{
        this.isAuthenticated= authenticated;
        if(!authenticated){
          this.router.navigateByUrl('/login')
        }else{
         this.runQuery();
        }
      }
    );


   }
  
isAuthenticated:boolean;
isLoading = false;
sellerInformation :ISellerInformation;
queryStatus:IStatus;
  ngOnInit() {
   
  }

  runQuery(){
    this.isLoading=true;
    this.sellerService.fetchSellerInformation().subscribe(
      res=>{
        this.isLoading=false;
        this.sellerInformation=res.data;
        console.log(res.data)
        this.queryStatus=res.status;
      }
    );
  }

}
