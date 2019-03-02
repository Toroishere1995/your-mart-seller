import { Component, OnInit, Input } from '@angular/core';
import { IProductDetails } from '../model/IProductDetails.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css']
})
export class ProductPreviewComponent {

  constructor(public _DomSanitizer: DomSanitizer) { }

  @Input() product: IProductDetails;
}
