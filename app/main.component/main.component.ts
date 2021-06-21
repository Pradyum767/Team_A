import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
// import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from "@angular/router";

@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: ['../app.component.css', '../viewDetails/viewDetails.css']
})
export class MainComponent implements OnInit {
  title = 'craze-angular';
  productsList: any[] = [];
  cartAddedProducts: {[key: number]: boolean};

  constructor(private appService: AppService, private router: Router) {

  }
  ngOnInit() {
    this.cartAddedProducts = {};
    this.appService.fetchAllProducts().then((data: any) => {
      this.productsList = data;
      let userDetails: any = this.appService.getUserDetails();
      if(userDetails) {
        this.appService.fetchAllCartProducts(userDetails.login.userid).then((data: any[]) => {
          data.forEach((product: any) => {
            this.cartAddedProducts[product.productId] = true;
          });
        })
      }
    })
  }

  viewAll(catId: any) {
    this.router.navigate(["/product", catId]);
  }

  goToCart(){
    let userDetails: any = this.appService.getUserDetails();
    this.router.navigate(["/cart", userDetails.login.userid]);
  }

  viewDetails(productId: number) {
    this.router.navigate(["/viewDetails", productId]);
  }

  addToCart(productId: number) {
    this.appService.emitChange(productId);
  }
}
