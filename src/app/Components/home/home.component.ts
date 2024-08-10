import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Services/Cart.service';
import { NotificationService } from '../../Services/Notification.service';
import { Notification } from '../../Models/Notification';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  @ViewChild('notificationMessage')
  notificationMessage!: ElementRef;

  constructor(private productService:ProductService, private notificationService:NotificationService,
    private activeRoute:ActivatedRoute, private cartService:CartService){}


  products!: any[];
  category!: string | null;
  idList:any[] = [];
  cartItems:any[] =[];
  notification!: Notification;
  notificationToggel !: boolean;

  ngOnInit(): void {
    this.products = this.productService.products.filter(select=>select.popular == "popular");

    // this.activeRoute.paramMap.subscribe(data=>{
    //   this.category = data.get('category');
    //   this.filterByCategories(this.category);
    // });


    this.idList = this.cartService.getAllFromLocalStorage();
    console.log(this.idList)

   
    console.log(this.idList)
    this.productService.products.filter(select=>{
      if(this.idList.includes(select.id)){
        this.cartItems.push(select)
      }
    })
    console.log(this.cartItems)
  }

  filterByCategories(category:any){
    if(category == 'vegetables'){
      this.products = this.productService.vegetables;
    }else if(category == 'fruits'){
      this.products = this.productService.fruits;
    }else if(category == 'beverages'){
      this.products = this.productService.beverages;
    }
    
    else{
      this.products = this.productService.products;
    }
  }

  addToCart(id:number){
    this.cartService.addToLocalStorage(id);
    this.addToCartNotification(id);
  }
  
  addToCartNotification(id: number){
    this.notification  = this.notificationService.addToCartNotification(id);
    this.notification?this.notificationToggel = true:this.notificationToggel=false;

    setTimeout((set: any)=>{
      this.notificationToggel = false;
      window.location.reload()
    },5000)
  }

  closeNotification(){
    this.notificationToggel = false;
    window.location.reload()
  }

}
