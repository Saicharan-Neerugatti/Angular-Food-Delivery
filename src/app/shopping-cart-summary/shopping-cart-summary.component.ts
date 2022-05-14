import { Component, Input, OnInit } from '@angular/core';
import { shoppingCart } from '../models/shoppin-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  cart$;
  carts:shoppingCart;
  shoppingCartItemCount:number;
  sum:number;


  @Input('cart') cart:shoppingCart;  // here using input property and using service to get details both are acceptable
                                     // input is used to get the values from previous component
                                    // normal method is used get the values from service

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
        this.sum +=  (this.carts.items[productID].quantity * this.carts.items[productID].product?.price)
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


}
