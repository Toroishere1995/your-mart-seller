import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import {IAuthenticationData} from '../model/IAuthenticationData.model'
import { IUserData } from '../model/IUserData.model';
import { ISellerInformation } from '../model/ISellerInformation.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authType: String = '';
  title: String = '';
 // errorList: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  hasErrors: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder) {
      this.authForm = this.fb.group({
        'userName': ['', Validators.required],
        'userPassword': ['', Validators.required]
      });
     }

  ngOnInit() {
    this.route.url.subscribe(data => {
     
      this.authType = data[data.length-1].path;
      
      this.title =  'Sign in' ;
      
    });
  }

  myRecaptcha = new FormControl(false);
 
    onScriptLoad() {
        console.log('Google reCAPTCHA loaded and is ready for use!')
    }
 
    onScriptError() {
        console.log('Something went long when loading the Google reCAPTCHA')
    }

    message:string;
    statusErrors:boolean=false;
    user:ISellerInformation;
  submitForm() {
    this.isSubmitting = true;
    
   // this.errorList = {errors: {}};
   const credentials:IAuthenticationData = this.authForm.value;
   credentials.admin='false',
    console.log(credentials)
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(

      
      data => {
        console.log(data)
        this.user=data.data.userInfo;
        console.log(this.user)
        console.log(this.user.sellerStatus)
        
        if(this.user.sellerStatus == 'NEED_APPROVAL'){
          this.statusErrors=true;
          this.message="needs approval"
          this.userService.purgeAuth();
        }else if(this.user.sellerStatus == 'REJECTED'){
          this.statusErrors=true;
          this.message="has been rejected"
          this.userService.purgeAuth();
        }else{
          this.router.navigateByUrl('/')
        }
       
  },
      err => {
        console.log("errors"+err)
       /// this.errorList = err;
        this.hasErrors=true;
        
        this.isSubmitting = false;
      }
    );
  }

}
