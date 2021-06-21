import { Component, OnInit, TemplateRef } from '@angular/core';
import {AppService} from "../app.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";

@Component({
  selector: 'cart',
  templateUrl: 'Cart.html',
  styleUrls: ['Cart.css']
})
export class CartComponent implements OnInit {
  title = 'craze-angular';
  productsList: any[] = [];
  productTotal: number;
  userId: string = "";
  modalRef: BsModalRef;

  constructor(private appService: AppService, private route: ActivatedRoute,
      private modalService: BsModalService, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = <string>params.get('id');
      this.appService.fetchAllCartProducts(this.userId).then((response: any) => {
        this.appService.fetchCartTotal(this.userId).then((data: any) => {
          this.productTotal = data;
        })
        this.productsList = response.map((data: any) => {
          this.appService.fetchCartProductQuantity(this.userId, data.productId).then((quantity: number) => {
            data["quantity"] = quantity;
          });
          data["quantity"] = 1;
          return data;
        });
      })
    })
  }

  viewDetails(productId: number) {
    this.router.navigate(["/viewDetails", productId]);
  }

  checkout(template: TemplateRef<any>) {
    this.appService.checkout(this.userId).then((data: any) => {
      this.modalRef = this.modalService.show(template);
    })
  }

  okButton(){
    this.modalRef.hide();
    this.router.navigate(["/main", this.userId]);
    this.appService.flushCartDetails(true);
  }

  somethingChanged(list: any) {
    this.appService.updateCartProductQuantity(this.userId, list.productId, list.quantity).then((data: number) => {
      list.quantity = data;
      this.appService.fetchCartTotal(this.userId).then((data: any) => {
        this.productTotal = data;
      })
    })
  }

  removeFromCart(productId: string, index: number) {
    this.appService.removeFromCart(this.userId, productId).then((data: any) => {
      this.appService.fetchCartTotal(this.userId).then((data: any) => {
        this.productTotal = data;
        this.productsList.splice(index, 1);
        this.appService.emitRemoveProductFromCartEvent(productId);
      })
    })
  }
}
