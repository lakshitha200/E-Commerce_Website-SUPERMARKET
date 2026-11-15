import { Component } from '@angular/core';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private notifications:NotificationService){}

  send(event: Event, form: HTMLFormElement){
    event.preventDefault();
    // Demo only: there is no backend to deliver the message yet.
    this.notifications.show('Thanks! Your message has been sent.');
    form.reset();
  }
}
