import { shopppingCartitem } from './shopping-cart-item';

export interface getOrder{
   datePlaced:number;
   monthPlaced:number;
   timePlaced:number;
   userId:string;
   yearPlaced:number;
   shipping:{
       addressLine1:string;
       addressLine2:string;
       city:string;
       name:string;
      };
    items:shopppingCartitem[];
}