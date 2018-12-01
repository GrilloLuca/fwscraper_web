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
  @Output() buy = new EventEmitter<Offer>();

  constructor() { }

  ngOnInit() {
    this.offer.menulink
  }

  onClickBuy = () => {
    this.buy.emit(this.offer);
    location.href = this.url + this.offer.menulink;
  }
}
