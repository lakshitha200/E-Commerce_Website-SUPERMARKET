import { Component } from '@angular/core';
import { ProductService } from '../../../Services/Product.service';

@Component({
  selector: 'app-categorites',
  templateUrl: './categorites.component.html',
  styleUrl: './categorites.component.css'
})
export class CategoritesComponent {
  constructor(public productService:ProductService){}
}
