import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private shoppingCartSer:ShoppingCartService,
    private db:AngularFireDatabase) { }
  storeOrder(order){
   let result =   this.db.list('/orders').push(order);
   this.shoppingCartSer.clearCart();   /// this is used to clear carts products after placing the order
    return result;
}

getOrders(){
  return this.db.list('/orders')
}
getOrderByUser(userId:string){
  console.log(userId);
  return this.db.list('/orders', 
      ref => ref.orderByChild('userId')
   );
}

getOrdersByKey(getId : number){
  return this.db.object('/orders/'+ getId)   
}
}
