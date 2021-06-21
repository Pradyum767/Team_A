import { Component } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import {IAddToCart, AppService} from "./app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'craze-angular';
  cartItems: {[key: number]: number} = {};
  counter: number = 0;
  userDetails: any = null;
  items: {path: string, value: string}[] = [
    {path: "/product/1", value: "Shoes"},
    {path: "/product/2", value: "Chocolates"},
    {path: "/product/3", value: "Mobiles"}
  ];

  constructor(private appService: AppService, private router: Router){
    this.appService.emitCartChangedEvent.subscribe((data:  number) => {
      if(this.userDetails) {
        let cartData: IAddToCart = {
          "id" : "",
          "userId" : this.userDetails.login.userid,
          "productId" : data.toString(),
          "quantity" : 1
        }
        this.appService.addProductToCart(cartData).then(() => {
          this.cartItems[data] = 1;
          this.counter = Object.keys(this.cartItems).length;
        }).
        catch((error) => {

        })
      }
      else {
        this.router.navigate(["/login"]);
      }

    });

    this.appService.emitRemoveProductFromCart.subscribe((productId: any) => {
      delete this.cartItems[productId];
      this.counter = Object.keys(this.cartItems).length;
    })

    this.appService.emitUserDetails.subscribe((userDetails: any) => {
      this.userDetails = userDetails;
      if(userDetails) {
        this.appService.fetchAllCartProducts(userDetails.login.userid).then((data: any[]) => {
          data.forEach((product: any) => {
            this.cartItems[product.productId] = 1;
            this.counter = Object.keys(this.cartItems).length;
          });
        })
      }
    });

    this.appService.flushCart.subscribe((flushCart: boolean) => {
      if(flushCart) {
        this.cartItems = {};
        this.counter = 0;
        this.appService.flushCartDetails(false);
      }
    })
  }

  logout() {
    this.cartItems = {};
    this.counter = 0
    this.appService.emitUserLoginDetails(null);
    this.router.navigate(["/main", ""]);
  }

  cart() {
    if(this.userDetails) {
      this.router.navigate(["/cart", this.userDetails.login.userid]);
    }
    else {
      this.router.navigate(["/cart", ""]);
    }
  }

  orders() {
    this.router.navigate(["/orders", this.userDetails.login.userid]);
  }
}
