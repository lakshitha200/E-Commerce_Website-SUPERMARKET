import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ProductService } from '../../Services/Product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  constructor(public productService:ProductService, private activeRoute:ActivatedRoute){}

  category: string | null = null;
  query = '';
  sort: 'default' | 'low' | 'high' | 'name' = 'default';
  products: any[] = [];

  get title(): string {
    if(this.query){ return 'Results for "' + this.query + '"'; }
    const c = this.productService.categories.find(x => x.key === this.category);
    return c ? c.label : 'All products';
  }

  ngOnInit(): void {
    combineLatest([this.activeRoute.paramMap, this.activeRoute.queryParamMap]).subscribe(([params, query]) => {
      this.category = params.get('category');
      this.query = (query.get('q') ?? '').trim();
      this.refresh();
    });
  }

  setSort(value: string){
    this.sort = value as typeof this.sort;
    this.refresh();
  }

  private refresh(){
    let list = [...this.productService.getByCategory(this.category)];

    if(this.query){
      const q = this.query.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    switch(this.sort){
      case 'low':  list.sort((a, b) => a.price - b.price); break;
      case 'high': list.sort((a, b) => b.price - a.price); break;
      case 'name': list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    this.products = list;
  }
}
