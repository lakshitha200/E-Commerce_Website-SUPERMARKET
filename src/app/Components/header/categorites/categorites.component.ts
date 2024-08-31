import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-categorites',
  templateUrl: './categorites.component.html',
  styleUrl: './categorites.component.css'
})
export class CategoritesComponent implements OnInit{

  @ViewChild("clcikCategory") clcikCategory!: ElementRef;
  @ViewChild("categoryMenu") categoryMenu!: ElementRef;


  
  
  ngOnInit(): void {

    document.addEventListener('click',(e)=>{
    })
  }

  isClicked = false;

  clickToggle(){
    // if(this.isClicked == true){
    //   this.isClicked = false;
    //   console.log(false)
    //   console.log(this.clcikCategory.nativeElement)
    //   console.log(this.categoryMenu.nativeElement)
    // }else{
    //   this.isClicked = true;
    //   console.log(this.clcikCategory.nativeElement)
    // }
  }

 
}
