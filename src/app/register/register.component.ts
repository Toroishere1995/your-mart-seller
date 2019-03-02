import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IRegistrationData } from '../model/IRegistrationData.model';
import { ISellerInformation } from '../model/ISellerInformation.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService:UserService, 
    private router: Router, 
    private route:ActivatedRoute,
  ) { }
    sellerRegistered:boolean=false;
  registeredSeller:ISellerInformation;
  ngOnInit() {
  }
  registerSeller(formValue){
    console.log(formValue);
    let registrationDetails:IRegistrationData = <IRegistrationData>formValue;
    registrationDetails.sellerStatus='NEED_APPROVAL';
    registrationDetails.registrationDate=new Date();
    console.log(registrationDetails);
    this.userService.registerUser(registrationDetails).subscribe(
      data=>{
          this.registeredSeller=data;
          this.sellerRegistered=true;
          console.log(this.registeredSeller.sellerUid);
         // this.router.navigate(['/']);
      }
    );
  }
  purgeRegister() {
    this.router.navigate(['/'])
  }
}
