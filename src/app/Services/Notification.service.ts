import { Injectable } from "@angular/core";
import { ProductService } from "./Product.service";
import { Notification } from "../Models/Notification";

@Injectable({
    providedIn:"root"
})
export class NotificationService{

    constructor(private productService:ProductService){}
    notification!: Notification;

    loggingNotification(){

    }

    addToCartNotification(id: number){
        const selectedProduct = this.productService.products.find(select => select.id == id);
        
        this.notification = new Notification(
            "addToCartNotification",
            "Success! "+ selectedProduct.name +" added to cart.",
            "alert-success"
        );

        return this.notification;
    }

    alReadyInTheCart(id: number){
        
    }
}