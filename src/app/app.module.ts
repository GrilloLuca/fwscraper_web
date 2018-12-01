import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WwwComponent } from './www/www.component';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { OfferComponent } from './www/offer/offer.component'

@NgModule({
  declarations: [
    AppComponent,
    WwwComponent,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'x-csrftoken',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }