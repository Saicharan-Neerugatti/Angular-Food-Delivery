import { shoppingCart } from './shoppin-cart';

export class orderValues{
    dateCreated:Date;
    items:any=[];
    constructor(public userId:string, public shipping:any, public shoppingCart:shoppingCart){
        this.dateCreated = new Date();
       this.items = shoppingCart?.items
    }
}