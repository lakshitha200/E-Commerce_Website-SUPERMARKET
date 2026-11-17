import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth.service';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute,
              private notifications:NotificationService){}

  error = '';
  busy = false;

  get returnUrl(): string | null {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : null;
  }

  async submit(event: Event, form: HTMLFormElement){
    event.preventDefault();
    if(this.busy){ return; }

    const data = new FormData(form);
    const text = (k: string) => String(data.get(k) ?? '');
    const password = text('password');

    if(password.length < 6){
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if(password !== text('confirm')){
      this.error = 'Passwords do not match.';
      return;
    }

    this.busy = true;
    const result = await this.auth.register({
      name: text('name'), username: text('username'), email: text('email'),
      phone: text('phone'), location: text('location'), password
    });
    this.busy = false;

    if(!result.ok){
      this.error = result.error;
      return;
    }
    this.error = '';
    this.notifications.show('Account created! Please sign in.');
    this.router.navigate(['/sign-in'], { queryParams: this.returnUrl ? { returnUrl: this.returnUrl } : {} });
  }
}
