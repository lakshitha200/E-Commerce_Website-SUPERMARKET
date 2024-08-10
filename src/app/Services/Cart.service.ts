import { Injectable } from "@angular/core";
import { ProductService } from "./Product.service";

@Injectable({providedIn:"root"})
export class CartService{

    constructor(private productService:ProductService){}

    addToLocalStorage(id:number){
        localStorage.setItem("K"+id,"V-"+id)
    }

    getAllFromLocalStorage(){
        var values: any[] = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push(Number(localStorage.getItem(keys[i])?.substring(2)) );
        }
        
       
        
        return values;
    }
}