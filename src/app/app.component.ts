import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthSerService } from './auth-ser.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project1-d1005';
  returnurl : any;

  constructor(private auth:AuthSerService,
             private route:Router,
             private userService:UserService
             ){
              
              auth.user$.subscribe(user => {
                if (user) {
                  console.log(user);
                  //here we pass the user value into user service to store the values into  firebase database
                 this.userService.save(user);
                 this.returnurl = localStorage.getItem('returnurl');
                 console.log(this.returnurl);
                 if (this.returnurl)
                 {
                  localStorage.removeItem('returnurl');  // it deletes the stored returnUrl and navigate the current page when we refresh that page
                 route.navigateByUrl(this.returnurl);
                 }
                 console.log('sai');
                }
              })
             }       
}
