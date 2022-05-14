import { Component, OnInit } from '@angular/core';
import { AuthSerService } from '../auth-ser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ofAuth : AuthSerService) { }

  ngOnInit(): void {
  }
 login(){ 
   // need to import the above to values to direct to google  page and below syntax is used to redirect the data
  // this.ofAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  this.ofAuth.login();
 }

}
