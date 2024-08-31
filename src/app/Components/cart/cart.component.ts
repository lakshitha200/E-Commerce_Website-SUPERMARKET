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

  @ViewChild("visa") visa!: ElementRef;
  @ViewChild("paypal") paypal!: ElementRef;
  @ViewChild("visaModel") visaModel!: ElementRef;
  @ViewChild("paypalModel") paypalModel!: ElementRef;
  @ViewChild("sprin1") sprin1!: ElementRef;
  @ViewChild("sprin2") sprin2!: ElementRef;
  @ViewChild("m1") m1!: ElementRef;
  @ViewChild("m2") m2!: ElementRef;
  @ViewChild("m11") m11!: ElementRef;
  @ViewChild("m22") m22!: ElementRef;
  // @ViewChild("success") success!: ElementRef;


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

  visaClick(){
    this.paypalModel.nativeElement.style.display = "none";
    this.visaModel.nativeElement.style.display = "block";
    this.visa.nativeElement.classList.add("active")
    this.paypal.nativeElement.classList.remove("active")
  }
  paypalClick(){
    this.visaModel.nativeElement.style.display = "none";
    this.paypalModel.nativeElement.classList.remove("fade");
    this.paypal.nativeElement.classList.add("active")
    this.visa.nativeElement.classList.remove("active")
    this.paypalModel.nativeElement.style.display = "flex";
  }

  pay(button:HTMLElement,id:number){ 
    if(id==1){
      this.sprin1.nativeElement.style.display = "flex";
      button.style.display = "none";
      setTimeout(()=>{
        this.sprin1.nativeElement.style.display = "none";
        button.style.display = "flex";
        button.style.backgroundImage = `linear-gradient(to right, #013d01,#013d01)`;
        this.m1.nativeElement.style.display = "none";
        this.m2.nativeElement.style.display = "flex";
        setTimeout(()=>{
          window.location.reload()
        },2000)
      },3000)
    }else{
      this.sprin2.nativeElement.style.display = "flex";
      button.style.display = "none";
      setTimeout(()=>{
        this.sprin2.nativeElement.style.display = "none";
        button.style.display = "flex";
        button.style.backgroundImage = `linear-gradient(to right, #013d01,#013d01)`;
        this.m11.nativeElement.style.display = "none";
        this.m22.nativeElement.style.display = "flex";
        setTimeout(()=>{
          window.location.reload()
        },2000)
      },3000)
    }
    
  }
}
