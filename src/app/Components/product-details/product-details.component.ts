import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';
import { NotificationService } from '../../Services/Notification.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService, private activeRoute:ActivatedRoute, private router:Router,
              public cart:CartService, private notifications:NotificationService){}

  product: any;
  related: any[] = [];

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(data => {
      this.product = this.productService.getById(Number(data.get('id')));
      this.related = this.product
        ? this.productService.products.filter(p => p.category === this.product.category && p.id !== this.product.id).slice(0, 5)
        : [];
    });
  }

  addToCart(){
    if(!this.cart.has(this.product.id)){
      this.cart.add(this.product.id);
      this.notifications.show(this.product.name + ' added to your cart.');
    }
  }

  buyNow(){
    this.cart.add(this.product.id);
    this.router.navigate(['/myShopping-cart']);
  }
}
