import { Component, OnInit, Input } from '@angular/core';
import { IProductImage } from '../model/IProductImage.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{

 @Input() images:IProductImage[];
  imagePresent:boolean=true;

  items=['assets/tv1.png','assets/tv2.jpeg','assets/tv3.jpeg'];
   constructor(){
   
   }
 
   ngOnInit(){
    if(this.images == null || this.images.length ==0){
      this.imagePresent=false;
    }
   }
}
