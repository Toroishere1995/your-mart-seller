import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ApiService } from './api.service';
import { ICategoryData } from '../model/ICategoryData.model';
import { IStatus } from '../model/IStatus.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private userService:UserService,private apiService:ApiService) { }


  getCategories():Observable<{data:ICategoryData[],status:IStatus}>{

    return this.apiService.get('/categories');
  }

}
