import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from './Result';

@Component({
  selector: 'app-www',
  templateUrl: './www.component.html',
  styleUrls: ['./www.component.css']
})
export class WwwComponent implements OnInit {

  base_url = 'http://localhost:8000/api';
  prices: number[] = [10, 15, 20, 25, 30, 35]
  orders: string[] = ['Price asc', 'Price desc', 'Name asc', 'Name desc']
  result: Result;
  minPrice = 0;
  maxPrice = 999;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.result = {
      url: "",
      offers: []
    }

    this.init();

  }

  logAnalytics(action: string, data: any) {
    
    let url_log_analytics: string = `${this.base_url}/log_analytics`;
    let url_token_security: string = `${this.base_url}/token_security`;
    
    // this.http.get<Result>(url_token_security).subscribe((data: any) => {

    //   let csrftoken = data['token'];
    //   let headers = new HttpHeaders().set('X-CSRFToken', csrftoken)
    //   this.http.post(url_log_analytics, {}, {headers: headers})
    //     .subscribe((data: any) => {

    //   });
    // });

    this.http.post(url_log_analytics, {action, data})
      .subscribe((data: any) => {
        
    });
    
  }

  init() {
    let url: string = `${this.base_url}/save_offers`;
    this.http.get<Result>(url).subscribe((data: any) => {
      if(data['result']) {
        this.getAllProducts();
      }
    });
  }

  getAllProducts() {
    let url: string = `${this.base_url}/get_all_offers`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });
  }

  onMinPriceSelected(idx: number) {
    this.minPrice = idx < 0 ? 0 : this.prices[idx];
    console.log(idx, this.minPrice, this.maxPrice);
    this.filterProducts();
    this.logAnalytics('minprice', {minPrice: this.minPrice});
  }

  onMaxPriceSelected (idx: number) {
    this.maxPrice = idx < 0 ? 999 : this.prices[idx];
    console.log(idx, this.minPrice, this.maxPrice);
    this.filterProducts();
    this.logAnalytics('maxprice', {maxPrice: this.maxPrice});
  }

  onSort (idx: number) {
    let sort: string;
    let order: string;

    switch(this.orders[idx]) {
      case 'Price asc':
        sort = 'hilite'; order = 'asc';
      case 'Price desc':
        order = 'desc';
      break;
      case 'Name asc':
        sort = 'product'; order = 'asc';
      case 'Name desc':
        order = 'desc';
      break;
    }

    if(!!sort && !!order) {
      this.filterAndSortProducts(sort, order);
      this.logAnalytics('sort', {sort, order});
    }
  }

  onBuy(link) {
    this.logAnalytics('buy', {url: link})
  } 

  filterAndSortProducts(sort: string, order: string) {

    let url: string = `${this.base_url}/filter_and_sort_products/${this.minPrice}/${this.maxPrice}/${sort}/${order}`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });

  }

  filterProducts() {

    let url: string = `${this.base_url}/filter_products/${this.minPrice}/${this.maxPrice}`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });

  }

}