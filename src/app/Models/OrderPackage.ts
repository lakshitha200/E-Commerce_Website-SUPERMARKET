import { Product } from "./Product";

export class OrderPackage{

    product: Product;
    newPrice!: number;
    quanity!: string;

    constructor(product: Product, newPrice: number,quanity: string){
        this.product = product;
        this.newPrice = newPrice;
        this.quanity = quanity;
    }
}