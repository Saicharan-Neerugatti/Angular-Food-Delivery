import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../category.service';
import { productFilter } from '../models/product-filter';
import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{

products$; // this is for normal  thing like to store the values in ober but if we want to filter we need to move nomral values
item$;
cart$;
carts:any;
subscription: Subscription;
products : productFilter[] = [];
products2:productFilter;
filteredProducts : productFilter[] = [];
 categories$;
 quants:any;
 cat : any;
  constructor(
    route: ActivatedRoute,
    productService : ProductsService,categoriesService : CategoryService,
    private cartser : ShoppingCartService,
    ) {

    this.products$ = productService.getAll().valueChanges();  // used too get all products
    this.products$.subscribe(products =>{
          this.products = products // stored to normal  values for filter purpose
    
            route.queryParamMap.subscribe(params => {     //used this block to dealing multiple assyn operations
             this.cat = params.get('category');
         
             this.filteredProducts = (this.cat) ?   // intially filtered products not having no details after that cat wil be stored and filtering happing
             this.products.filter(p => p.category === this.cat): //  x ? y : z----->this is the correct syntax
             this.products;
             })
       }); 

    this.categories$ = categoriesService.getCategories();
    this.cart$ = cartser.getCart();
    this.subscription = this.cart$.subscribe(cart => {
      this.carts = cart
      console.log(this.carts);
    })
    
    this.products$.subscribe(products =>{     // this is checking purpose data stored in non array preporty so we can use in 
                                              //   cart.items[this.product.title]
      this.products2 = products
  //    console.log(this.products2);
    })
  }
  ngOnInit(): void {
    
  }
/****** moved this to  product-card component
 addToCart(product:productFilter){
 this.cartser.addToCart(product);
 console.log('saicharan');
 if(!this.carts) 
 {
   this.quants = 0;
 }
 else {
  let item = this.carts.items[product.title]
  this.quants = item.quantity;
 }
 }
 *//////
ngOnDestroy(){
   this.subscription.unsubscribe();
}
}
