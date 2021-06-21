import { Component, OnInit, TemplateRef } from '@angular/core';
import {AppService} from "../app.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'orders',
  templateUrl: 'Orders.html',
  styleUrls: ['../Cart/Cart.css']
})
export class OrdersComponent implements OnInit {
  ordersList: any[] = [];
  userId: string = "";

  constructor(private appService: AppService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.userId = <string>params.get('id');
      this.appService.getOrderHistory(this.userId).then((response: any) => {
        this.ordersList = response;
      })
    })
  }

  viewDetails(productId: number) {
    this.router.navigate(["/viewDetails", productId]);
  }
}
