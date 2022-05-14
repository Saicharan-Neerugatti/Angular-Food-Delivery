import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthSerService } from '../auth-ser.service';
import { appUser } from '../models/app-user';
import { shoppingCart } from '../models/shoppin-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  // this is normal value this is going some drawback so need to use the varibale as obsevable 
  // user : firebase.User;
  // user$ : Observable<firebase.User>
  appUser : appUser;
  cart$:Observable<any>
  carts:shoppingCart;
  shoppingCartItemCount:number;
  constructor(public Auth: AuthSerService,
              private cartser: ShoppingCartService 
              ) {
    // to know about our authentication status before and afte logout
   //  ofAuth.authState.subscribe(x =>
   //  console.log(x)
   //   )
    // normal methos to subscirbe the value 
    //ofAuth.authState
    //.subscribe(user =>
    //  this.user = user
    //  )

    // this code moved to authser service file
    //this.user$ = ofAuth.authState;
   

    // to store the values in appuser$ to appuser to use in html file to show and hidden the admin links
    Auth.appUser$.subscribe( appUser => {
      this.appUser = appUser;
   //   console.log(appUser.isAdmin);
    })
    this.cart$ = this.cartser.getCart();
 
    
   
              
        /** this code is moved to another class in shopping-car.ts and   get the cartItem count there itself****/
         this.cart$.subscribe(cart=> {
          this.carts = cart
          this.shoppingCartItemCount = 0;
          for(let productID in this.carts?.items){
          this.shoppingCartItemCount +=  this.carts.items[productID].quantity
          }
         })
      
   }

  ngOnInit(): void {
  }
 
  logout(){
   // below syntax is used to signout the data
  // this.ofAuth.signOut();
   this.Auth.logout();
  }

}
