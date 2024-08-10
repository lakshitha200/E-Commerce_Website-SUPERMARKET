import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { SignupComponent } from './Components/header/signup/signup.component';
import { SigninComponent } from './Components/header/signin/signin.component';
import { ContactComponent } from './Components/header/contact/contact.component';
import { BillPaymentsComponent } from './Components/header/bill-payments/bill-payments.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"sign-up",component:SignupComponent},
  {path:"sign-in",component:SigninComponent},
  {path:"contact",component:ContactComponent},
  {path:"bill-payment",component:BillPaymentsComponent},
  {path:"all-products",component:ProductsComponent},
  {path:"home/product-details/:name/:id",component:ProductDetailsComponent},
  {path:"all-products/product-details/:name/:id",component:ProductDetailsComponent},
  {path:"all-products/:category/product-details/:name/:id",component:ProductDetailsComponent},
  {path:"all-products/:category",component:ProductsComponent},

  {path:"myShopping-cart",component:CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
