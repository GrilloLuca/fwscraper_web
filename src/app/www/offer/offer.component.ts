import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Offer } from '../Offer';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer: Offer;
  @Input() url: string;
  @Output() buy = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onClickBuy = (link) => {
    this.buy.emit(link);
    location.href = this.url + link;
  }
}
