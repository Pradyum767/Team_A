import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login';
import { MainComponent } from './main.component/main.component';
import { SignInComponent } from './SignIn/SignIn';
import { AppService } from "./app.service";
import { ProductsComponent } from './Products/Product';
import {CartComponent} from "./Cart/Cart";
import {ViewDetailsComponent} from "./ViewDetails/ViewDetails";
import {OrdersComponent} from "./Orders/Orders"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignInComponent,
    ProductsComponent,
    CartComponent,
    ViewDetailsComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
