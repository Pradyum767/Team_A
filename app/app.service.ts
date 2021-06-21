import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

export interface IAddToCart {
  "id" : string,
  "userId" : string,
  "productId" : string,
  "quantity" : number
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public emitCartChangedEvent = new Subject<any>();
  public emitUserDetails = new Subject<any>();
  public flushCart = new Subject<boolean>();
  public emitRemoveProductFromCart = new Subject<any>();
  private userDetails: any;
  constructor(private http: HttpClient) { }

  fetchAllProducts() {
    let url = "http://localhost:8090/product/getall";
    return this.fetchProductList(url);
  }

  fecthProductListByCategory(productId: string) {
    let url = "http://localhost:8090/product/category/" + productId;
    return this.fetchProductList(url);
  }

  fecthCompanyListByCategory(productId: string) {
    let url = "http://localhost:8090/product/getCompanyByCategory/" + productId;
    return this.fetchProductList(url);
  }

  fetchProductList(url: string) {
    return this.http.get(url).toPromise().then((response: any) => {
      return response;
    });
  }

  addProductToCart(data: IAddToCart) {
    let url: string = "http://localhost:8090/product/addtocart";
    return this.http.post(url, data).toPromise().then((response: any) => {
      console.log(response);
      return response;
    })
  }

  emitChange(change: any) {
      this.emitCartChangedEvent.next(change);
  }

  emitUserLoginDetails(change: any) {
    this.userDetails = change;
    this.emitUserDetails.next(change);
  }

  getUserDetails() {
    return this.userDetails;
  }

  flushCartDetails(change: boolean){
    this.flushCart.next(change);
  }

  emitRemoveProductFromCartEvent(change: string) {
    this.emitRemoveProductFromCart.next(change);
  }

  fetchAllCartProducts(userId: string) {
    let url = "http://localhost:8090/product/displaycart/" + userId;
    return this.fetchProductList(url);
  }

  fetchCartTotal(userId: string) {
    let url = "http://localhost:8090/product/gettotal?userId=" + userId;
    return this.fetchProductList(url);
  }

  fecthProductById(productId: string){
    let url: string = "http://localhost:8090/product/getProductByProductId?productId=" + productId;
    return this.fetchProductList(url);
  }

  checkout(userId: string) {
    let url: string = "http://localhost:9999/purchase/checkout?userId=" + userId;
    return this.fetchProductList(url);
  }

  fetchCartProductQuantity(userId: string, productId: string) {
    let url: string = "http://localhost:8090/product/getquantity/"+userId+"/" + productId;
    return this.fetchProductList(url);
  }

  updateCartProductQuantity(userId: string, productId: string, quantity: number) {
    let url: string = "http://localhost:8090/product/changeQuantity/"+userId+"/" + productId + "/" + quantity;
    return this.fetchProductList(url);
  }

  removeFromCart(userId: string, productId: string) {
    let url: string = "http://localhost:8090/product/removeeachcart/"+userId+"/" + productId;
    return this.fetchProductList(url);
  }

  getOrderHistory(userId: string) {
    let url: string = "http://localhost:8080/user/gethistory?userId="+userId;
    return this.fetchProductList(url);
  }
}
