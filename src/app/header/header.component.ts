import { Component, OnInit } from '@angular/core';
import { ISellerInformation } from '../model/ISellerInformation.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  currentSeller:ISellerInformation;
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.currentSeller.subscribe(
      (userData) => {
        this.currentSeller = userData.userInfo;
      }
    );
  }
}
