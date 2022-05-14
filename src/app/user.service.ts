import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { appUser } from './models/app-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 //used for storing user data in database
 constructor(private db: AngularFireDatabase) { }
 save(user:firebase.User){
 this.db.object('/users/' + user.uid).update({
   name : user.displayName,
   email : user.email
 })  
} 

get (uid:string) : AngularFireObject<appUser>
//get (uid:string) : Observable<any>
{
  return this.db.object('/users/'+ uid);
}
}
