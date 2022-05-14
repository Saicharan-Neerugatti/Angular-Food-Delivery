import { Observable } from 'rxjs';
import { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { shopppingCartitem } from './shopping-cart-item';


// here we are using class instead of interface to active more preporties
export interface shoppingCart{
    dataCreated:number;
   items:shopppingCartitem[];
}


    
        

                             
                     
                        