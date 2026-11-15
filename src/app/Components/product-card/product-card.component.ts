import { Component, Input } from '@angular/core';
import { CartService } from '../../Services/Cart.service';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({required:true}) product!: any;

  constructor(public cart:CartService, private notifications:NotificationService){}

  addToCart(event: Event){
    event.preventDefault();
    event.stopPropagation();
    if(this.cart.has(this.product.id)){ return; }
    this.cart.add(this.product.id);
    this.notifications.show(this.product.name + ' added to your cart.');
  }
}
