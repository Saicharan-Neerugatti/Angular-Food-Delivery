import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { date } from 'ng9-validation/date/validator';
import { promise } from 'protractor';
import { productFilter } from './models/product-filter';
import { map, take } from 'rxjs/operators';
import { shopppingCartitem } from './models/shopping-cart-item';
import { shoppingCart } from './models/shoppin-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  cartId2 : any;
  item$:any;


  constructor(
    private db: AngularFireDatabase) { }

 private create(){
  return this.db.list('/shopping-carts/').push({})
 //   {
 //   dataCreated : new Date().getTime()
 //  }
   
                 }

  getCart(){
        let cartId3 = this.getOrCreateCartId();
        return this.db.object('/shopping-carts/' + cartId3).valueChanges();
                               }

   private getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId')
    if(!cartId){
    this.create().then(results => {
      localStorage.setItem('cartId',results.key);   // here we create new data base in firebase and store key to local value 
  //    console.log(results.key);
      return results.key
     })
    }
    else{
  //    console.log(cartId);
      return cartId;
      // add product to cart
    }
   }
   


   private getItem(cartId2,producttitle){
    return this.db.object('/shopping-carts/' + cartId2 + '/items/' + producttitle)
   }


   async addToCart(product:productFilter){
    this.cartId2 = await this.getOrCreateCartId();
    console.log(this.cartId2);
    this.item$ = this.getItem(this.cartId2,product.title).valueChanges();
 // this.item$ = this.db.object('/shopping-carts/' + this.cartId2 + '/items/' + product.key).valueChanges();
                                                          //  console.log(this.item$);
     this.item$.pipe(take(1)).subscribe(item=> {
                                                          // console.log(item);
// the below logic is used to handle items in data base...intially no items were created so else block excuted created new items date base and
// then if will execute and quaantity updated by one by one
    if(item){
      this.getItem(this.cartId2,product.title)
          .update({ quantity: item.quantity + 1});
      }
     else this.getItem(this.cartId2,product.title)
                  .update ({product: product , quantity :1 })
                          })
  }

  async reduceTheCart(product:productFilter){
    this.cartId2 = await this.getOrCreateCartId();
    console.log(this.cartId2);
    this.item$ = this.getItem(this.cartId2,product.title).valueChanges();
 // this.item$ = this.db.object('/shopping-carts/' + this.cartId2 + '/items/' + product.key).valueChanges();
                                                          //  console.log(this.item$);
     this.item$.pipe(take(1)).subscribe(item=> {
                                                          // console.log(item);
// the below logic is used to handle items in data base...intially no items were created so else block excuted created new items date base and
// then if will execute and quaantity updated by one by one
    if(item){
      this.getItem(this.cartId2,product.title)
          .update({ quantity: item.quantity - 1});
      }
     else this.getItem(this.cartId2,product.title)
                  .update ({product: product , quantity :1 })
                          })
  }


  clearCart(){
   let cartId3 = this.getOrCreateCartId();
   return this.db.object('/shopping-carts/' + cartId3 + '/items').remove();
  }

}
