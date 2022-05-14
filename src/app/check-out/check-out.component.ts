import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthSerService } from '../auth-ser.service';
import { shoppingCart } from '../models/shoppin-cart';
import { orderValues } from '../models/order';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Router } from '@angular/router';
import { date } from 'ng9-validation/date/validator';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy{
  shipping:any= {};
  cart$;
  carts:shoppingCart;
  cartSubscription:Subscription;
  userSubscription:Subscription;
  userId:any;

  constructor(
    private router:Router,
    private authser:AuthSerService,
    private oderService:OrderService,
    private shoppingcartser:ShoppingCartService) { }

  ngOnInit(): void {
    this.cart$ = this.shoppingcartser.getCart();
    this.cartSubscription = this.cart$.subscribe(cart=>{
   this.carts=cart
   console.log(this.carts)
    })
    this.userSubscription = this.authser.user$.subscribe(user => {
      this.userId = user.displayName
      console.log(this.userId);
    })
  
  }

placeOrder(){
//  console.log(this.shipping);
/* below code is similar to 46 to 57 but used another class to get the values....both are efficient
let x = new orderValues(this.userId,this.shipping,this.carts)
this.oderService.storeOrder(x); 
*/
let order = {
  userId:this.userId,
  datePlaced:new Date().getDate(),
  monthPlaced:new Date().getMonth(),
  yearPlaced:new Date().getFullYear(),
  timePlaced:new Date().getTime(),
  shipping: this.shipping,
  items: this.carts?.items

   }

//console.log(order);
let result = this.oderService.storeOrder(order);
this.router.navigate(['/order-success',result.key])

}
ngOnDestroy(){
this.cartSubscription.unsubscribe();
this.userSubscription.unsubscribe();
}

}
