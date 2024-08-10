import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SearchComponent } from './Components/header/search/search.component';
import { CategoritesComponent } from './Components/header/categorites/categorites.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { SigninComponent } from './Components/header/signin/signin.component';
import { SignupComponent } from './Components/header/signup/signup.component';
import { ContactComponent } from './Components/header/contact/contact.component';
import { BillPaymentsComponent } from './Components/header/bill-payments/bill-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponent,
    CategoritesComponent,
    ProductDetailsComponent,
    ProductsComponent,
    CartComponent,
    NotificationComponent,
    ProfileComponent,
    SigninComponent,
    SignupComponent,
    ContactComponent,
    BillPaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
