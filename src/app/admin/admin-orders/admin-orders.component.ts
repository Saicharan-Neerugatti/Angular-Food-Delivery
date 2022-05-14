import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthSerService } from 'src/app/auth-ser.service';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
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
