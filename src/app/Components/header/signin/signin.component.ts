import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../Services/Auth.service';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  constructor(private auth:AuthService, private router:Router, private route:ActivatedRoute,
              private notifications:NotificationService){}

  error = '';
  showPassword = false;
  busy = false;

  /** Where to go after signing in (only same-site paths are accepted). */
  get returnUrl(): string | null {
    const url = this.route.snapshot.queryParamMap.get('returnUrl');
    return url && url.startsWith('/') && !url.startsWith('//') ? url : null;
  }

  async submit(event: Event, username: string, password: string){
    event.preventDefault();
    if(this.busy){ return; }
    this.busy = true;
    try{
      const user = await this.auth.login(username, password);
      if(user){
        this.error = '';
        this.notifications.show('Welcome back, ' + user.name + '!');
        this.router.navigateByUrl(this.returnUrl ?? '/profile');
      }else{
        this.error = 'Incorrect username or password.';
      }
    }catch{
      this.error = 'Could not sign in. Please use a secure (https) connection and try again.';
    }finally{
      this.busy = false;
    }
  }
}
