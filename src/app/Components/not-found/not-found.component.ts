import { Component } from '@angular/core';
import { ProductService } from '../../Services/Product.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(public productService:ProductService){}
}
