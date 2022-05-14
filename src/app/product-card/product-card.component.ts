import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { productFilter } from '../models/product-filter';
import { shoppingCart } from '../models/shoppin-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit,OnDestroy {
  cart$;
  carts:shoppingCart;
  subscription:Subscription;
  @Input('product') product:productFilter;
  @Input('shopping-cart') shoppingCart:shoppingCart;
  constructor(
  private cartser:ShoppingCartService
  ) {
    this.cart$ = cartser.getCart();
  this.subscription = this.cart$.subscribe(cart => {
    this.carts = cart                  // this is useful when we create new product-quantity component for quntity purpose
  //  console.log(this.carts);           // and to render getquantity() method in this ......this code not needed if dont need to use productquntity comp
  })                                   // this is not used now as input assign value bcz we are using productcard input name as value 
   }

  ngOnInit(): void {
  }
  
  /***** moved  all these 3 methods into productquantity and no more used in this component but addtocart is used only here*/
  addToCart(product:productFilter){
    this.cartser.addToCart(product);
    console.log('saicharan');
     }

     reduceTheCart(product:productFilter) {
       this.cartser.reduceTheCart(product);
     }
    
     getQuantity(){
      if(!this.shoppingCart) return 0;
      let item = this.shoppingCart.items[this.product.title]
      return item? item.quantity : 0 ;
    }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
 }
}    
