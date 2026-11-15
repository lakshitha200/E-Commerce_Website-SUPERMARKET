import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';

interface AdSlide {
  badge: string;
  title: string;
  text: string;
  cta: string;
  link: any[];
  icon: string;
  theme: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public productService:ProductService, public cart:CartService,
              @Inject(PLATFORM_ID) private platformId: object){}

  popular: any[] = [];
  heroImages: any[] = [];

  features = [
    { icon: 'fa-truck-fast',   title: 'Fast delivery',    text: 'Same-day delivery to your doorstep, right when you need it.' },
    { icon: 'fa-leaf',         title: 'Always fresh',     text: 'Produce picked daily and checked for quality before it ships.' },
    { icon: 'fa-shield-heart', title: 'Best quality',     text: 'Trusted suppliers and a freshness promise on every order.' },
    { icon: 'fa-tags',         title: 'Great prices',     text: 'Everyday low prices and regular savings on your favourites.' },
  ];

  /* ---------- advertising carousel ---------- */
  slides: AdSlide[] = [
    { badge: 'Up to 20% off', title: 'Fresh vegetable week', text: 'Crisp, farm-picked greens at prices you will love.',
      cta: 'Shop vegetables', link: ['/all-products', 'vegetables'], icon: 'fa-carrot', theme: 'green' },
    { badge: 'New season', title: 'Juicy fruits, sweet deals', text: 'Apples, berries and tropical favourites - delivered fresh.',
      cta: 'Shop fruits', link: ['/all-products', 'fruits'], icon: 'fa-apple-whole', theme: 'coral' },
    { badge: 'Free delivery', title: 'Free delivery over Rs. 5,000', text: 'Fill your basket and we will bring it to your door for free.',
      cta: 'Start shopping', link: ['/all-products'], icon: 'fa-truck-fast', theme: 'amber' },
    { badge: 'Chef picks', title: 'Fresh fish and prime meat', text: 'Quality cuts and the catch of the day, ready to cook.',
      cta: 'Shop fish & meat', link: ['/all-products', 'fishAndMeat'], icon: 'fa-fish', theme: 'blue' },
    { badge: 'Stay refreshed', title: 'Beverages for every mood', text: 'Juices, tea, coffee and soft drinks for the whole family.',
      cta: 'Shop beverages', link: ['/all-products', 'beverages'], icon: 'fa-mug-hot', theme: 'purple' },
  ];
  current = 0;
  private timer: any;
  private paused = false;
  private touchX: number | null = null;
  private readonly intervalMs = 5000;

  ngOnInit(): void {
    const all = this.productService.products;
    this.popular = all.filter(p => p.popular == 'popular').slice(0, 10);
    this.heroImages = this.popular.slice(0, 3);
    this.startAuto();
  }

  ngOnDestroy(): void {
    this.stopAuto();
  }

  go(i: number){
    this.current = (i + this.slides.length) % this.slides.length;
    this.restartAuto();
  }
  next(){ this.go(this.current + 1); }
  prev(){ this.go(this.current - 1); }

  pause(){ this.paused = true; }
  resume(){ this.paused = false; }

  touchStart(e: TouchEvent){ this.touchX = e.touches[0].clientX; }
  touchEnd(e: TouchEvent){
    if(this.touchX === null){ return; }
    const dx = e.changedTouches[0].clientX - this.touchX;
    this.touchX = null;
    if(Math.abs(dx) > 40){ dx < 0 ? this.next() : this.prev(); }
  }

  private startAuto(){
    // Browser only (no timers during server rendering) and respect reduced-motion.
    if(!isPlatformBrowser(this.platformId)){ return; }
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches){ return; }
    this.stopAuto();
    this.timer = setInterval(() => {
      if(!this.paused && !document.hidden){
        this.current = (this.current + 1) % this.slides.length;
      }
    }, this.intervalMs);
  }
  private stopAuto(){ clearInterval(this.timer); }
  private restartAuto(){ this.startAuto(); }
}
