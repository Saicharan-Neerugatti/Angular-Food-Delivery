import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthSerService } from '../auth-ser.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit,OnDestroy {
  orders$;
  orders:any;
  userId:string;
  userSub : Subscription;
  orderSub : Subscription;
  constructor(public authSer:AuthSerService, private orderser:OrderService ) {
    
   }

  ngOnInit(): void {
    this.userSub = this.authSer.user$.subscribe(user => {
      if (user)
      this.userId = user.displayName
      console.log(this.userId);
      this.orders$ = this.orderser.getOrderByUser(this.userId).snapshotChanges();
      console.log(this.orders$);
           this.orderSub = this.orders$.subscribe( orders => {
           this.orders = orders
           console.log(this.orders);
          })
        })
   
  }
 
  ngOnDestroy(){
    this.userSub.unsubscribe();
    this.orderSub.unsubscribe();
  }
}
