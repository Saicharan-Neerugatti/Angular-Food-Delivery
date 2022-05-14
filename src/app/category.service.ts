import { Injectable } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories(): Observable<any>{

   // return this.db.list('/categories').snapshotChanges();


    return this.db.list('/categories', 
      ref => ref.orderByChild('name')
   ).snapshotChanges();
  }
}
