import { IProductImage } from "./IProductImage.model";

export interface IProductDetails{
    productId:number,
    sellerProductCode:string;
    productName:string;
    productShortDescription:string,
    productLongDescription:string,
    productDimensions:string,
    productCategory:string,
    productMrp:number,
    productSsp:number,
    productYmp:number,
    productPrimaryImage:Blob;
    productStatus:string,
    productComment:string,
    productImages:IProductImage[];
}