import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { IProductImage } from '../model/IProductImage.model';
import { IProductDetails } from '../model/IProductDetails.model';
import { UserService } from '../service/user.service';
import { CategoryService } from '../service/category.service';
import { ICategoryData } from '../model/ICategoryData.model';
import { IStatus } from '../model/IStatus.model';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { observable } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {

  @ViewChild('addPForm')
private addPForm: NgForm;
  productForm:FormGroup;
  names:string[] = [];
  selectedFile: File = null;
  imageUrl;
  productCategory;
  imageInfo: IProductImage[] = [];
  status:IStatus;
editable:boolean=false;
  
  constructor(private categoryService:CategoryService,
    private userService:UserService, 
    private router: Router, 
    private route:ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder) {
      
      this.categoryService.getCategories().subscribe(
        res=>{
         res.data.forEach(entry=>{
            this.names.push(entry.categoryName);
          })
          console.log(res.data);
          console.log(this.names)
          this.method()
          this.status=res.status;
        }
      )
  }
  product:IProductDetails={} as IProductDetails;
  method() {
    

    
    this.route.data.subscribe((data: { article: IProductDetails }) => {
      if (data.article) {
        console.log(data.article)
        this.product = data.article;

        setTimeout(() => {
          this.addPForm['controls']['sellerProductCode'].setValue(this.product.sellerProductCode);
          this.addPForm['controls']['productName'].setValue(this.product.productName)
          this.addPForm['controls']['productShortDescription'].setValue(this.product.productShortDescription)
          this.addPForm['controls']['productLongDescription'].setValue(this.product.productLongDescription)
          this.addPForm['controls']['productDimensions'].setValue(this.product.productDimensions)
          console.log(this.productCategory)
          this.productCategory=this.product.productCategory;
          this.editable=true;

          console.log(this.productCategory)
          //this.addPForm['controls']['productCategory'].setValue(this.product.productCategory)
          this.addPForm['controls']['productMrp'].setValue(this.product.productMrp)
          this.addPForm['controls']['productSsp'].setValue(this.product.productSsp)
          this.addPForm['controls']['productYmp'].setValue(this.product.productYmp)
          this.imageUrl=this.product.productPrimaryImage;
          //this.addPForm['controls']['productPrimaryImage'].setValue(this.product.productPrimaryImage)
          
        });
      }
    });
  }

  addProduct(formValue) {
    console.log(this.addPForm);
    console.log(formValue)
    let newProduct: IProductDetails={} as IProductDetails;
    if(this.product){
      Object.assign(newProduct,this.product);
    }
    newProduct= <IProductDetails>formValue;
    
    let val=newProduct.productMrp;
    let val2=newProduct.productSsp;
    let val3=newProduct.productYmp;
    console.log(val);
    newProduct.productMrp=parseInt(''+val,10);
    newProduct.productSsp=parseInt(''+val2,10);
    newProduct.productYmp=parseInt(''+val3,10);
    if(this.product && this.product.productStatus){
      newProduct.productStatus = "REVIEW"
      newProduct.productId = this.product.productId;
    }else{
    newProduct.productStatus = "NEW"
    newProduct.productId=0;
    }
    newProduct.productComment=this.product.productComment;
    newProduct.productCategory = this.productCategory;
    newProduct.productPrimaryImage = this.imageUrl;
    newProduct.productImages = this.imageInfo;
    
    console.log(newProduct)
    
    this.productService.addProduct(this.userService.getCurrentSeller().userInfo.sellerId, newProduct)
      .subscribe(
        (data: any) => {
          console.log('data added success')
          this.router.navigate(['/'])
        },
        (err) => {
          console.log(err)
        }

      );

  }

  purgeAdd() {
    this.router.navigate(['/'])
  }


  onSelectCategory(event) {
    console.log(event.target.value)
    this.productCategory = event.target.value
  }

  onfileSelected(event) {

    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (filedata) => {
      this.imageUrl = reader.result + ''
    }
    reader.readAsDataURL(this.selectedFile)


  }

  onImagesSelected(event) {
    let files = event.target.files
    if (files) {

      let image: IProductImage = {
       
        imageName: '',
        image: '',
        imageId: 0

      }
      for (let i = 0; i < files.length; i++) {
        image.imageName = files[i].name;
        image.imageId = i;
        let file=files[i]
        let reader = new FileReader();

        this.readerHelper(reader,file,i)

      }
    }
    console.log(this.imageInfo)
    event.srcElement.value = null; 
  }


   readerHelper(reader:FileReader,file:File,i:number){
    let image: IProductImage = {

      imageName: '',
      image: '',
      imageId: 0

    }
    image.imageName=file.name
    image.imageId=i;
    
    reader.onload = (filedata) => {
        image.image = reader.result + '';
        this.imageInfo.push(image)
      }
      reader.readAsDataURL(file)
     

  }


}