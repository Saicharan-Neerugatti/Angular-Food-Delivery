import { applySourceSpanToExpressionIfNeeded } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthSerService } from './auth-ser.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminauthguradService implements CanActivate{

  constructor(private auth: AuthSerService,private userService : UserService) { }
/*
  canActivate():any{
    return this.auth.user$.pipe(map( user => {
     this.userService.get(user.uid);
     console.log(user.uid);
     console.log(user.email);
     if ( user.email === 'saicharan5420@gmail.com')
      return true;
    else
      return false;
     }))
   }
*/


//here i am using both map and switch map to get the details from firebase database and assign those values to app user interface
// which we created in models.... so firebase values are moved to appuser object values...and use that isAdmin to activate 
// admin pages


   canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(switchMap((user: firebase.User) =>
                                           this.userService.get(user.uid).valueChanges()),
                                map((appUser:any) => appUser.isAdmin));
   }
}
