import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { observable, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { appUser } from './models/app-user';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSerService {

  user$ : Observable<firebase.User>
  constructor(
    private userService : UserService,
    private ofAuth : AngularFireAuth,
    private route:ActivatedRoute
    ) { 
    this.user$ = ofAuth.authState;
  }
  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    console.log(returnUrl);
    localStorage.setItem('returnurl',returnUrl);
    console.log(returnUrl);
    this.ofAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
    this.ofAuth.signOut();
  }

// return the values in database and stored in appuser
 get appUser$() : Observable<appUser> {
   return this.user$.pipe(switchMap((user: firebase.User) =>{
                                    if (user)
                                    return this.userService.get(user.uid).valueChanges()
                                    else
                                    return of(null);        // this is used when user is not logged in and over come logout issue
                                                           }
                                    ))
 }
 

}
