import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'viewDetails',
  templateUrl: './viewDetails.html',
  styleUrls: ['./viewDetails.css']
})
export class ViewDetailsComponent implements OnInit {
  productId: string;
  productDetails: any;
  constructor(private appService: AppService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = <string>params.get('id');
      this.appService.fecthProductById(this.productId).then((data: any) => {
        this.productDetails = data;
      })
    })
  }

  addToCart(productId: number) {
    this.appService.emitChange(productId);
  }
}
