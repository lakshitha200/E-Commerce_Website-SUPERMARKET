import { Component } from '@angular/core';
import { NotificationService } from '../../../Services/Notification.service';

@Component({
  selector: 'app-bill-payments',
  templateUrl: './bill-payments.component.html',
  styleUrl: './bill-payments.component.css'
})
export class BillPaymentsComponent {
  constructor(private notifications:NotificationService){}

  providers = [
    { key: 'electricity', label: 'Electricity', icon: 'fa-bolt' },
    { key: 'water',       label: 'Water',       icon: 'fa-droplet' },
    { key: 'mobile',      label: 'Mobile',      icon: 'fa-mobile-screen' },
    { key: 'internet',    label: 'Internet',    icon: 'fa-wifi' },
    { key: 'tv',          label: 'TV',          icon: 'fa-tv' },
    { key: 'insurance',   label: 'Insurance',   icon: 'fa-shield-halved' },
  ];

  selected = this.providers[0];
  error = '';

  pay(event: Event, form: HTMLFormElement, account: string, amount: string){
    event.preventDefault();
    const value = Number(amount);
    if(!account.trim() || !Number.isFinite(value) || value <= 0){
      this.error = 'Enter a valid account number and an amount greater than 0.';
      return;
    }
    this.error = '';
    // Demo only: there is no payment backend.
    this.notifications.show('Rs. ' + value.toFixed(2) + ' paid to ' + this.selected.label + ' (' + account.trim() + ').');
    form.reset();
  }
}
