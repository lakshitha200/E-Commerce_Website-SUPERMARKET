import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../Services/Notification.service';

/**
 * Used twice:
 *  - once in app.component as the global toast,
 *  - once as the routed /notifications page (shows recent activity).
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  /** Routed instances have a routeConfig; the global one (injected with the root route) does not. */
  isPage: boolean;

  constructor(public notifications:NotificationService, route:ActivatedRoute){
    this.isPage = !!route.snapshot.routeConfig;
  }
}
