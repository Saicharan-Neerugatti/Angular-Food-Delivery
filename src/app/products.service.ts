import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db : AngularFireDatabase) { }

  create(product)
{
  // this is used to store the data( products data) in firebase 
  return this.db.list('/products').push(product);
}
 getAll() {
   return this.db.list('/products');
 }

 get(productId){
   return this.db.object('/products/'+ productId).valueChanges();
   ; // this is used to get only one product id details....by using this method
                                                 // we can get one data form list of data from database
 }

 // used for updating the exsting values in Database
update(productId,product){
   return this.db.object('/products/' + productId).update(product);
 }

 remove(productId){
   return this.db.object('/products/' + productId).remove();
 }
}
