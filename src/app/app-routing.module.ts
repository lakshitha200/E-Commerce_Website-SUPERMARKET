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
import { ProfileComponent } from './Components/profile/profile.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { CanActivate } from './Services/Auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent,title:'Freshora | Fresh groceries, delivered'},
  {path:"home",redirectTo:"",pathMatch:"full"},
  {path:"sign-up",component:SignupComponent,title:'Sign up | Freshora'},
  {path:"sign-in",component:SigninComponent,title:'Sign in | Freshora'},
  {path:"contact",component:ContactComponent,title:'Contact us | Freshora'},
  {path:"bill-payment",component:BillPaymentsComponent,title:'Bill payments | Freshora'},
  {path:"all-products",component:ProductsComponent,title:'All products | Freshora'},
  {path:"all-products/:category",component:ProductsComponent,title:'Shop | Freshora'},
  {path:"product-details/:name/:id",component:ProductDetailsComponent,title:'Product | Freshora'},
  {path:"myShopping-cart",component:CartComponent,title:'My cart | Freshora'},
  {path:"profile",component:ProfileComponent,canActivate:[CanActivate],title:'My profile | Freshora'},
  {path:"notifications",component:NotificationComponent,title:'Notifications | Freshora'},
  {path:"**",component:NotFoundComponent,title:'Page not found | Freshora'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top',anchorScrolling:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
