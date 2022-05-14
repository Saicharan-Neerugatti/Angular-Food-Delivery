import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms'

import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


import { RouterModule } from '@angular/router';
import { NgbDropdown,NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthSerService } from './auth-ser.service';
import { AuthGuardService } from './auth-guard.service';
import { UserService } from './user.service';
import { AdminauthguradService } from './adminauthgurad.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductsService } from './products.service';
import { CustomFormsModule } from 'ng9-validation';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


var config = {
  apiKey: "AIzaSyAnF6aK1Q0lTRy7HaTaxksZ7FCUKsmq5Xo",
  authDomain: "project1-d1005.firebaseapp.com",
  databaseURL: "https://project1-d1005.firebaseio.com",
  projectId: "project1-d1005",
  storageBucket: "project1-d1005.appspot.com",
  messagingSenderId: "915024683269",
  appId: "1:915024683269:web:d925ac95e648d68b72976c",
  measurementId: "G-CMPFQRFVJ8"
};

@NgModule({
  declarations: [
    AppComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    BsNavbarComponent,
    CheckOutComponent,
    HomeComponent,
    LoginComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ViewOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgbModule,
    RouterModule.forRoot([
      { path:'', component : ProductsComponent},
       { path:'products', component : ProductsComponent},
       { path:'shopping-cart', component : ShoppingCartComponent},
       { path:'check-out', component : CheckOutComponent,canActivate:[AuthGuardService]},
       { path:'order-success/:id', component : OrderSuccessComponent,canActivate:[AuthGuardService]},
       { path:'login', component : LoginComponent},
       { path:'admin/products', component : AdminProductsComponent,canActivate:[AuthGuardService,AdminauthguradService]},
       { path:'admin/orders', component : AdminOrdersComponent,canActivate:[AuthGuardService,AdminauthguradService]},
       { path:'admin/products/new', component : ProductFormComponent,canActivate:[AuthGuardService,AdminauthguradService]},
       { path:'admin/products/:id', component : ProductFormComponent,canActivate:[AuthGuardService,AdminauthguradService]},
       { path:'my/orders',component : MyOrdersComponent,canActivate:[AuthGuardService]},
       { path:'vieworders/:id', component : ViewOrdersComponent,canActivate:[AuthGuardService]},
    ])
  ],
  providers: [NgbDropdown,AuthSerService,AuthGuardService,UserService,AdminauthguradService,CategoryService,
             ProductsService,ShoppingCartService,OrderService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
