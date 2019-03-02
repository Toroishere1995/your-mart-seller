import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { IUserData } from '../model/IUserData.model';
import { IRegistrationData } from '../model/IRegistrationData.model';
import { ISellerInformation } from '../model/ISellerInformation.model';
import { IStatus } from '../model/IStatus.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentSellerSubject = new BehaviorSubject<IUserData>({} as IUserData);
  public currentSeller = this.currentSellerSubject.asObservable().pipe(distinctUntilChanged());

  public isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService:ApiService,
    private http:HttpClient,
    private jwtService:JwtService
  ) { }

  public getCurrentSeller(){
    
    return this.currentSellerSubject.value;

  }

  setAuth(user: IUserData){
    this.jwtService.saveToken(user.token)
    console.log("JHE"+user);
    this.currentSellerSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }
  purgeAuth() {
    this.jwtService.removeToken();
    console.log("Jpdvvdsc");
    this.currentSellerSubject.next({} as IUserData);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<{data:IUserData,status:IStatus}> {
    const route = (type === 'login') ? '/login' : 'register';
    return this.apiService.post(route, {user: credentials})
      .pipe(map(
      res => {
        console.log(res.data);
        this.setAuth(res.data);
        return res;
      }
    ));

  }
  populate() {
    if (this.jwtService.getToken()) {
      console.log("Started ")
      this.apiService.get('/seller')
      .subscribe(
        res => {this.setAuth(res.data),console.log(res.data)},
        err => this.purgeAuth()
      );
    } else {
     
      this.purgeAuth();
    }
  }

  registerUser(body:IRegistrationData):Observable<ISellerInformation>{
    return this.apiService.post('/register',{user:body})
    
  }
}
