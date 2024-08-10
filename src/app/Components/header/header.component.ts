import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/Cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private cartService:CartService){}

  idList:any[]=[];

  ngOnInit(): void {

    //get cart list
    this.idList = this.cartService.getAllFromLocalStorage();
    console.log(this.idList);
  }

}
