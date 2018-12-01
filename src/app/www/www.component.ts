import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from './Result';
import { Offer } from './Offer';

@Component({
  selector: 'app-www',
  templateUrl: './www.component.html',
  styleUrls: ['./www.component.css']
})
export class WwwComponent implements OnInit {

  api_url = 'http://localhost:8000/api';
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
    this.logAnalytics('test', {test: 'ciao'});

  }

  init() {
    let url: string = `${this.api_url}/save_offers`;
    this.http.get<Result>(url).subscribe((data: any) => {
      if(data['result']) {
        this.getAllProducts();
      }
    });
  }

  /**
   * http POST
   * this function save user action and data in the database table 'analytics' to understand user's behaviours.
   * see http://localhost:8000/admin/api/analytics
   * @param action the action name of the user (buy, sort, minprice, maxprice)
   * @param data the json data with the action data
   */
  logAnalytics(action: string, data: any) {
    this.http.post(`${this.api_url}/log_analytics`, {action, data}).subscribe((data: any) => {
      console.log(data);
    });
  }

  /**
   * http GET
   * retrieve all product unfiltered and unsorted
   */
  getAllProducts() {
    let url: string = `${this.api_url}/get_all_offers`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });
  }

  /**
   * called by angular ui, set the min price field
   * execute the filter and log minprice action
   * @param idx the selected option index
   */
  onMinPriceSelected(idx: number) {
    this.minPrice = idx < 0 ? 0 : this.prices[idx];
    this.filterPriceProducts();
    this.logAnalytics('minprice', {minPrice: this.minPrice});
  }

  /**
   * called by angular ui, set the min price field
   * execute the filter and log maxprice action
   * @param idx the selected option index
   */
  onMaxPriceSelected (idx: number) {
    this.maxPrice = idx < 0 ? 999 : this.prices[idx];
    this.filterPriceProducts();
    this.logAnalytics('maxprice', {maxPrice: this.maxPrice});
  }

  /**
   * called by angular ui, set sort parameters
   * execute the filter and log maxprice action
   * @param idx the selected option index
   */
  onSort (idx: number) {
    let sort: string;
    let order: string;

    switch(this.orders[idx]) {
      case 'Price asc':
        sort = 'hilite'; 
        order = 'asc';
      break;
      case 'Price desc':
        sort = 'hilite'; 
        order = 'desc';
      break;
      case 'Name asc':
        sort = 'product'; 
        order = 'asc';
      break;
      case 'Name desc':
        sort = 'product'; 
        order = 'desc';
      break;
    }

    if(!!sort && !!order) {
      this.filterAndSortProducts(sort, order);
      this.logAnalytics('sort', {sort, order});
    }
  }

  /**
   * Output button click callback from the offer component 
   * @param offer the offer object selected
   */
  onBuy(offer: Offer) {
    this.logAnalytics('buy', {offer});
  } 

  /**
   * call the filter api and update the dataset
   * @param sort the model property name which you want to sort
   * @param order sort order asc: ascending, desc: descending
   */
  filterAndSortProducts(sort: string, order: string) {

    let url: string = `${this.api_url}/filter_and_sort_products/${this.minPrice}/${this.maxPrice}/${sort}/${order}`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });

  }

  /**
   * apply minprice and maxprice filter and update the dataset
   */
  filterPriceProducts() {

    let url: string = `${this.api_url}/filter_products/${this.minPrice}/${this.maxPrice}`;
    this.http.get<Result>(url).subscribe((data: Result) => this.result = { ...data });

  }

}