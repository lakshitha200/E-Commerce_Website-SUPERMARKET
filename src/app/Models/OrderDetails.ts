
import { Product } from "./Product";

export class OrderDetails{

    products: Product[];
    totalPrice: number;
    itemCount: number;
    deliveryFee: number;
    coupon: number;
    discount: number;
    discountedPrice: number;


    constructor(
        products: Product[],
        totalPrice: number,  
        itemCount: number, 
        deliveryFee: number,
        coupon: number,
        discount: number,
        discountedPrice: number,){

            this.products = products;
            this.totalPrice = totalPrice;
            this.itemCount = itemCount;
            this.deliveryFee = deliveryFee;
            this.coupon = coupon;
            this.discount = discount;
            this.discountedPrice = discountedPrice;
          
    }
}