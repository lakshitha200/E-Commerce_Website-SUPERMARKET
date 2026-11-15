import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../Services/Cart.service';
import { AuthService } from '../../Services/Auth.service';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public cart:CartService, public auth:AuthService,
              private router:Router, private notifications:NotificationService){}

  menuOpen = false;

  logout(){
    this.auth.logOut();
    this.notifications.show('You have been signed out.', 'alert-info');
    this.router.navigate(['/']);
  }
}
