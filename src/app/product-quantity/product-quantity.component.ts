import { Component, Input, OnInit } from '@angular/core';
import { productFilter } from '../models/product-filter';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product:productFilter;
  @Input('shopping-cart') shoppingCart;
  constructor(
  private cartser:ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

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

}
