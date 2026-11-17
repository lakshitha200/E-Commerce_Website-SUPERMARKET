import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../Services/Cart.service';
import { ProductService } from '../../Services/Product.service';
import { NotificationService } from '../../Services/Notification.service';
import { AuthService } from '../../Services/Auth.service';

interface CartItem { product: any; qty: number; }

const DISCOUNT_PCT = 5;
const DELIVERY_FEE = 300;
const FREE_DELIVERY_OVER = 5000;
const COUPONS: Record<string, number> = { FRESH10: 10, WELCOME5: 5 };

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {

  constructor(private cartService:CartService, private productService:ProductService,
              private notifications:NotificationService, public auth:AuthService){}

  items: CartItem[] = [];
  couponPct = 0;
  couponCode = '';
  method: 'card' | 'paypal' = 'card';
  paying = false;
  paid = false;

  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = this.cartService.cart$.subscribe(lines => {
      this.items = lines
        .map(l => ({ product: this.productService.getById(l.id), qty: l.qty }))
        .filter(i => !!i.product);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get count(){ return this.items.reduce((n, i) => n + i.qty, 0); }
  get subtotal(){ return this.round(this.items.reduce((t, i) => t + i.product.price * i.qty, 0)); }
  get discount(){ return this.round(this.subtotal * (DISCOUNT_PCT + this.couponPct) / 100); }
  get delivery(){ return !this.items.length || this.subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE; }
  get total(){ return this.round(this.subtotal - this.discount + this.delivery); }

  private round(n: number){ return Math.round(n * 100) / 100; }
  get toFreeDelivery(){ return Math.max(FREE_DELIVERY_OVER - this.subtotal, 0); }
  get discountPct(){ return DISCOUNT_PCT + this.couponPct; }

  inc(item: CartItem){ this.cartService.setQty(item.product.id, item.qty + 1); }
  dec(item: CartItem){ this.cartService.setQty(item.product.id, item.qty - 1); }

  remove(item: CartItem){
    this.cartService.remove(item.product.id);
    this.notifications.show(item.product.name + ' removed from your cart.', 'alert-info');
  }

  applyCoupon(code: string){
    const key = code.trim().toUpperCase();
    if(COUPONS[key]){
      this.couponPct = COUPONS[key];
      this.couponCode = key;
      this.notifications.show('Coupon ' + key + ' applied (' + COUPONS[key] + '% off).');
    }else{
      this.couponPct = 0;
      this.couponCode = '';
      this.notifications.show('That coupon code is not valid.', 'alert-danger');
    }
  }

  openCheckout(){
    this.paid = false;
    this.paying = false;
  }

  pay(){
    if(this.paying || !this.items.length){ return; }
    if(!this.auth.isAuthenticated()){
      this.notifications.show('Please sign in to complete your payment.', 'alert-danger');
      return;
    }
    this.paying = true;
    // Demo only: there is no payment backend.
    setTimeout(() => {
      this.paying = false;
      this.paid = true;
      this.cartService.clear();
      this.couponPct = 0;
      this.couponCode = '';
      this.notifications.show('Payment successful. Thank you for shopping with Freshora!');
    }, 1800);
  }
}
