import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  constructor(private router:Router){}

  submit(event: Event, term: string){
    event.preventDefault();
    const q = term.trim();
    this.router.navigate(['/all-products'], { queryParams: q ? { q } : {} });
  }
}
