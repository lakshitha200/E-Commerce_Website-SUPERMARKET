import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth.service';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private auth:AuthService, private router:Router, private notifications:NotificationService){}

  error = '';
  showPassword = false;

  submit(event: Event, username: string, password: string){
    event.preventDefault();
    const user = this.auth.login(username, password);
    if(user){
      this.error = '';
      this.notifications.show('Welcome back, ' + user.name + '!');
      this.router.navigate(['/profile']);
    }else{
      this.error = 'Incorrect username or password.';
    }
  }
}
