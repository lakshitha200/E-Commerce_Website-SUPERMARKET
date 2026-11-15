import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(public productService:ProductService, public cart:CartService){}

  popular: any[] = [];
  heroImages: any[] = [];

  features = [
    { icon: 'fa-truck-fast',   title: 'Fast delivery',    text: 'Same-day delivery to your doorstep, right when you need it.' },
    { icon: 'fa-leaf',         title: 'Always fresh',     text: 'Produce picked daily and checked for quality before it ships.' },
    { icon: 'fa-shield-heart', title: 'Best quality',     text: 'Trusted suppliers and a freshness promise on every order.' },
    { icon: 'fa-tags',         title: 'Great prices',     text: 'Everyday low prices and regular savings on your favourites.' },
  ];

  ngOnInit(): void {
    const all = this.productService.products;
    this.popular = all.filter(p => p.popular == 'popular').slice(0, 10);
    this.heroImages = this.popular.slice(0, 3);
  }
}
