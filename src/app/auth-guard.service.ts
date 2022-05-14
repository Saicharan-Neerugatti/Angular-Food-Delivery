import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthSerService } from './auth-ser.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor( private auth: AuthSerService, private router:Router){}
   canActivate(route, state: RouterStateSnapshot){
    return this.auth.user$.pipe(map( user => {
       if (user) 
       {
         console.log('true');
         return true;
       }
     this.router.navigate(['/login'],{queryParams:{ returnUrl : state.url}});
     return false;
     }))
   }
}   
