import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{


  constructor(private jwtService:JwtService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    console.log("Here")
    if(this.jwtService.getToken()){
      return true;
    }
    console.log("Here dude")
    this.router.navigate(['/login']);
    return false;
  }
}