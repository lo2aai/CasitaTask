import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainPageComponentComponent } from './main-page-component/main-page-component.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent, MainPageComponentComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
