import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(public auth:AuthService, private router:Router, private notifications:NotificationService){}

  get user(){ return this.auth.user; }

  logout(){
    this.auth.logOut();
    this.notifications.show('You have been signed out.', 'alert-info');
    this.router.navigate(['/']);
  }
}
