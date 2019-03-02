import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import {ISellerInformation} from '../model/ISellerInformation.model'
import { IStatus } from '../model/IStatus.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private apiService:ApiService,
    private userService:UserService) { }

    fetchSellerInformation():Observable<{data:ISellerInformation,status:IStatus}>{
      const id=this.userService.getCurrentSeller().userInfo.sellerId;
      console.log(this.apiService.get('/sellers/'+id).subscribe(data=>{console.log(data)}));
      return this.apiService.get('/sellers/'+id);
    }
      
    

}
