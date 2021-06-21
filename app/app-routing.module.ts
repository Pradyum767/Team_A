import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { MainComponent } from './main.component/main.component';
import { SignInComponent } from './SignIn/SignIn';
import { ProductsComponent } from './Products/Product';
import {CartComponent} from "./Cart/Cart";
import {ViewDetailsComponent} from "./ViewDetails/ViewDetails";
import {OrdersComponent} from "./Orders/Orders";

const routes: Routes = [
  { path: 'main/:id', component: MainComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'product/:id', component: ProductsComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'viewDetails/:id', component: ViewDetailsComponent },
  { path: 'orders/:id', component: OrdersComponent },
  {path: 'main', redirectTo: 'main/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
