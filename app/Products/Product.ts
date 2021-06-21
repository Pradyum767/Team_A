import { Component, OnInit, TemplateRef} from '@angular/core';
import {  FormGroup,FormControl } from '@angular/forms';
import {AppService} from "../app.service";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'product',
  templateUrl: './Product.html',
  styleUrls: ['../app.component.css']
})
export class ProductsComponent implements OnInit{
  title = 'craze-angular';
  listView: any = [];
  productId: string = "";
  modalRef: BsModalRef;
  selectFilterType: any = "price";
  listCompanyData: string[];
  priceMinValue: any = 0;
  priceMaxValue: any = 100000;
  companySelectFilter: any;
  ratingMinValue: any = 0;
  ratingMaxValue: any = 5;
  cartAddedProducts: {[key: number]: boolean};
  constructor(private appService: AppService, private route: ActivatedRoute,
    private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = <string>params.get('id');
      this.selectFilterType = "price";
      this.cartAddedProducts = {};
      this.appService.fecthProductListByCategory(this.productId).then((data: any) => {
        this.listView = data;
        let userDetails: any = this.appService.getUserDetails();
        if(userDetails) {
          this.appService.fetchAllCartProducts(userDetails.login.userid).then((data: any[]) => {
            data.forEach((product: any) => {
              this.cartAddedProducts[product.productId] = true;
            });
          })
        }
      })
    })
  }

  addToCart(productId: number) {
    this.cartAddedProducts[productId] = true;
    this.appService.emitChange(productId);
  }

  goToCart(){
    let userDetails: any = this.appService.getUserDetails();
    this.router.navigate(["/cart", userDetails.login.userid]);
  }

  viewDetails(productId: number) {
    this.router.navigate(["/viewDetails", productId]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeFilter() {
    if(this.selectFilterType === "company") {
      this.appService.fecthCompanyListByCategory(this.productId).then((data: any) => {
        this.listCompanyData = data;
      })
    }
  }

  submitFilter() {
    let url: string = "http://localhost:8090/product/";
    let urlParams: string = "";
    switch (this.selectFilterType) {
      case 'price':
          urlParams = "byprice/" +this.priceMinValue+ "/" + this.priceMaxValue;
        break;
      case 'company':
        urlParams = "bycompany/" + this.companySelectFilter;
      break;
      case 'rating':
          urlParams = "byrating/" + this.ratingMinValue + "/" + this.ratingMaxValue;
        break;
      default:
        break;
    }

    url += urlParams + "/" + this.productId;
    this.appService.fetchProductList(url).then((data: any) => {
      this.listView = data;
      this.modalRef.hide();
    })
    console.log(urlParams);

  }
}
