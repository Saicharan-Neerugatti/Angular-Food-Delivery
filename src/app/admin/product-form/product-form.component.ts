import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductsService } from 'src/app/products.service';
import { take } from 'rxjs/operators';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$:any ;
  products$ : any = {};
  products: any = {};
  key:any;
  title:string;
  id:any;
   // intially it is no value and can able to add new products
  constructor(
    private router : Router,
    private actRout : ActivatedRoute,
    private categoryService : CategoryService, 
    private productsservice : ProductsService) {

    console.log(categoryService.getCategories());
    this.categories$ = categoryService.getCategories();
    console.log(this.categories$);
     this.id = this.actRout.snapshot.paramMap.get('id');  // get the id from link by using parammap and used on that id we can get the 
                           // details from database and stored to normal value(products)
     if(this.id){
      this.products$ = this.productsservice.get(this.id);
      console.log(this.products$);

      this.productsservice.get(this.id).pipe(take(1)).subscribe( p => this.products = p);
      console.log(this.products);
     }     
   }

  ngOnInit(): void {
  }
 // used to store the data in data base
  save(product){
    if (this.id){
    console.log(product);
    this.productsservice.update(this.id,product);
    }
    else{
      console.log(product);
    this.productsservice.create(product); 
    }
    this.router.navigate(['/admin/products']); // here we navigate to products page after saving the data like new product page
  }

  delete(){
    if(confirm(' Are you happy to delete this product?')){
      this.productsservice.remove(this.id);
      this.router.navigate(['/admin/products']);
    }
  }
}


