import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { productFilter } from 'src/app/models/product-filter';
//import { product } from 'src/app/models/product-filter';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {

  products$:any;
  products$$:any;
  product:productFilter[];
  filteredProducts: productFilter[];
  subscripption : Subscription;

  constructor(private productsService:ProductsService) { 
    this.products$ = this.productsService.getAll().valueChanges();
    this.products$$ = this.productsService.getAll().snapshotChanges();
    console.log(this.products$);
     
    //here i subscribe the values into normal values
    this.subscripption = this.products$$
    .subscribe(products=> this.filteredProducts = this.product = products);

    console.log(this.product);
    console.log(this.filteredProducts);
    console.log(this.subscripption);

  }

//used for searching products

filter(query:string){

this.filteredProducts = (query) ?
 // this.product.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
 this.product.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())):
  this.product;
}

ngOnDestroy(){
this.subscripption.unsubscribe();
}
  ngOnInit(): void {
  }

}
