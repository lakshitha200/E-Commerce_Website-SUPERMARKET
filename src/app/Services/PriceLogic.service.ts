import { Injectable } from "@angular/core";
import { ProductService } from "./Product.service";
import { OrderPackage } from "../Models/OrderPackage";

@Injectable({providedIn:"root"})
export class PriceLogicService{

    listed(id:number,quantityNumbers:any,cartItems:any,orderPackage:OrderPackage,fullOrder:any){
     
        const x = quantityNumbers.find((select: { id: number; }) => select.id == id);
        if(x.inList==false){
          x.inList = true
          console.log( x.inList)
    
          const prod = cartItems.find((select: { id: number; })=> select.id == id);
          const quanity = x.q;
          const newPrice = prod.price*x.q;
    
          orderPackage = new OrderPackage(prod,newPrice,quanity);
          fullOrder.push(orderPackage)
          console.log(fullOrder)
      
          
        }else{
          x.inList = false
          for(let i=0;i<fullOrder.length;i++){
            if(fullOrder[i].product.id == id){
              fullOrder.splice(i,1)
            }
            console.log(fullOrder)
          }
        }
      }

      unList(id:number,quantityNumbers:any,fullOrder:any){
        const x = quantityNumbers.find((select: { id: number; }) => select.id == id);
        x.inList = false
          for(let i=0;i<fullOrder.length;i++){
            if(fullOrder[i].product.id == id){
              fullOrder.splice(i,1)
            }
            console.log(fullOrder)
          }
      }

}