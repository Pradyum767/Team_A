import { Component } from '@angular/core';
import {  FormGroup,FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import {AppService} from "../app.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent {
  invalidCredentials: boolean = false;
  loginForm = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private http: HttpClient, private router: Router, private appService: AppService) { }

  onSubmit() {
    this.invalidCredentials = false;
    let validateUrl: string = "http://localhost:8080/user/validate?userid={0}&password={1}"
    validateUrl = validateUrl.replace("{0}", this.loginForm.value.userId).
                  replace("{1}", this.loginForm.value.password)
    this.http.get(validateUrl).toPromise().then((response: any) => {
      if(response) {
        this.appService.emitUserLoginDetails(response);
        this.router.navigate(["/main", response.name]);
      }
      else {
        this.invalidCredentials = true;
      }
    }).
    catch((error: any) => {
      this.invalidCredentials = true;
    })
  }
}
