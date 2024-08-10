import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';
import { NotificationService } from '../../Services/Notification.service';
import { Notification } from '../../Models/Notification';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  constructor(private productService:ProductService,private activeRoute:ActivatedRoute
    ,private cartService:CartService,private notificationService:NotificationService
  ){}
  product: any;
  id!: number|null;
  idList:any[]=[];
  notification!: Notification;
  notificationToggel !: boolean

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(data=>{
      console.log(data)
      this.id = Number(data.get('id'));
      this.filterById(this.id);
    });

    this.idList = this.cartService.getAllFromLocalStorage();
    console.log(this.idList);

  }
  filterById(id:number){
    this.product = this.productService.products.find(select => select.id == id);
  }

  addToCart(id:number){
    this.cartService.addToLocalStorage(id);
    this.addToCartNotification(id);
  }
  
  addToCartNotification(id: number){
    // this.notificationMessage.nativeElement.
    this.notification  = this.notificationService.addToCartNotification(id);
    // console.log(this.notification )
    
    this.notification?this.notificationToggel = true:this.notificationToggel=false;

    setTimeout((set: any)=>{
      this.notificationToggel = false;
      window.location.reload()
    },5000)
    // console.log(this.notificationToggel)
  }

  closeNotification(){
    this.notificationToggel = false;
    window.location.reload()
  }

  
}
