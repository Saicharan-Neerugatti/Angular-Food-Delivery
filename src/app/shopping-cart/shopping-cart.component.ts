import { Component, OnInit } from '@angular/core';
import { shoppingCart } from '../models/shoppin-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$;
  carts:shoppingCart;
  shoppingCartItemCount:number;
  sum:number;
  productid2;
  constructor(private cartser:ShoppingCartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartser.getCart();
    this.cart$.subscribe(cart=> {
      this.carts = cart
      this.shoppingCartItemCount = 0;
      this.sum = 0
    //  this.productid2 = this.carts.items
    //  console.log(this.productid2);
      for(let productID in this.carts?.items){
      //console.log(productID);
     
      this.shoppingCartItemCount +=  this.carts.items[productID].quantity
      }
      for(let productID in this.carts?.items){
        //console.log(productID);
        this.sum +=  (this.carts.items[productID].quantity * this.carts.items[productID].product.price)
        }
     })
  }
  get totalItemsCount(){
    if(this.carts?.items){
    return Object.keys(this.carts?.items);
    }
    else
    return 0;
  }


  clearCart(){
    this.cartser.clearCart();
  }
}
