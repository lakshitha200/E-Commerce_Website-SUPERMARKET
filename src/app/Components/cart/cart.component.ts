import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from '../../Services/Cart.service';
import { ProductService } from '../../Services/Product.service';
import { OrderPackage } from '../../Models/OrderPackage';
import { PriceLogicService } from '../../Services/PriceLogic.service';
import { OrderDetails } from '../../Models/OrderDetails';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  // @ViewChild('plus') plus!: ElementRef;
  // @ViewChild('minus') minus!: ElementRef;

  constructor(private cartService:CartService,private productService:ProductService,
    private priceLogicService:PriceLogicService){}

  idList:any[] = [];
  cartItems:any[] =[];
  quantityNumbers: any[] = [];
  q!: number;

  fullOrder:any[] = [];
  orderPackage!: OrderPackage;
  fullOrderDetails!: OrderDetails;

  ngOnInit(): void {

    this.idList = this.cartService.getAllFromLocalStorage();
    console.log(this.idList)
   

    this.productService.products.filter(select=>{
      if(this.idList.includes(select.id)){
        this.cartItems.push(select)
        this.quantityNumbers.push({"id":select.id,"q":1,"inList":false})
      }
    })
    console.log(this.cartItems)
    console.log(this.quantityNumbers)
    console.log(this.fullOrder)

    this.orderDetails();

  }

  removeCart(id:number){
    localStorage.removeItem("K"+id)
    window.location.reload()
  }
  
  

  add(id:number){
    this.priceLogicService.unList(id,this.quantityNumbers,this.fullOrder)
    const x = this.quantityNumbers.find(select => select.id == id);
    x.q = x.q + 1;
    console.log(x)
  }


  remove(id:number){
    const x = this.quantityNumbers.find(select => select.id == id);
    x.q = x.q - 1;
    console.log(x)
  }

  listed(id:number){
    this.priceLogicService.listed(id,this.quantityNumbers,this.cartItems,this.orderPackage,this.fullOrder)
    this.orderDetails();
    // console.log(id)
    // const x = this.quantityNumbers.find(select => select.id == id);
    // if(x.inList==false){
    //   x.inList = true
    //   console.log( x.inList)

    //   const prod = this.cartItems.find(select=> select.id == id);
    //   const quanity = x.q;
    //   const newPrice = prod.price*x.q;

    //   this.orderPackage = new OrderPackage(prod,newPrice,quanity);
    //   this.fullOrder.push(this.orderPackage)
    //   console.log(this.fullOrder)
  
      
    // }else{
    //   x.inList = false
    //   const prod = this.cartItems.find((select: { id: number; })=> select.id == id);
    //   for(let i=0;i<this.fullOrder.length;i++){
    //     if(this.fullOrder[i].product.id == id){
    //       this.fullOrder.splice(i,1)
    //     }
    //     console.log(this.fullOrder)
    //   }
    // }
  }

  orderDetails(){
    var total = 0;
    var count = 0;
    const deliveryFee = 300;
    const coupon = 0;
    const discount = 5;
    var discountedPrice = (total * 5)/100;

    this.fullOrder.filter(select => {
      total = total + select.newPrice;
      count++;
    });
 
    this.fullOrderDetails 
    this.fullOrderDetails = new OrderDetails(this.fullOrder,total,count,deliveryFee,coupon,discount,total -(total * 5)/100);

    console.log(this.fullOrderDetails);
  }
}
