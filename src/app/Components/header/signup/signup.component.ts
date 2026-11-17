import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router:Router, private notifications:NotificationService){}

  error = '';

  submit(event: Event, form: HTMLFormElement){
    event.preventDefault();
    const data = new FormData(form);
    const password = String(data.get('password') ?? '');

    if(password.length < 6){
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if(password !== String(data.get('confirm') ?? '')){
      this.error = 'Passwords do not match.';
      return;
    }
    this.error = '';
    // Demo only: there is no backend to store the account yet.
    this.notifications.show('Account created! Please sign in.');
    this.router.navigate(['/sign-in']);
  }
}
