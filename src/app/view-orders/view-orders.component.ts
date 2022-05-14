import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getOrder } from '../models/getorder';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
getId:any;
orders$;
orders:getOrder;
  constructor(
    private router :Router,
    private actRout:ActivatedRoute,
    private orderSer:OrderService
    ) { 

    this.getId = this.actRout.snapshot.paramMap.get('id');
    console.log(this.getId);
    this.orders$ = this.orderSer.getOrdersByKey(this.getId).valueChanges();
    console.log(this.orders$)
    this.orders$.subscribe(orders => {
      this.orders = orders
      console.log(this.orders)
    })
    }

  ngOnInit(): void {
  }
  get totalItemsCount(){
    if(this.orders?.items){
    return Object.keys(this.orders?.items);
    }
    else
    return 0;
  }
}
