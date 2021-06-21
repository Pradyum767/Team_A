import { Component } from '@angular/core';
import {  FormGroup,FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient,  HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'signIn',
  templateUrl: './SignIn.html',
  styleUrls: ['../app.component.css']
})
export class SignInComponent {
  title = 'craze-angular';
  signInForm = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
    dob: new FormControl(''),
    userId: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  passwordNotMatch: boolean = false;
  signInComplete: boolean = false;
  signInMessage: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    let signInForm = this.signInForm.value;
    this.passwordNotMatch = signInForm.password !== signInForm.confirmPassword;
    if(!this.passwordNotMatch) {
      let signInUrl: string = `http://localhost:8080/user/signup?mail=${signInForm.email}&name=${signInForm.userName}&dob=${signInForm.dob}&login.userid=${signInForm.userId}&login.password=${signInForm.password}`
      this.http.get(signInUrl.trim())
      .subscribe((response: any) => {
        console.log(response);
        if(response) {
          this.signInComplete = true;
          this.signInMessage = response.message === "User Added Successfully!" ?
          "SignIn successful. Click below to go to login/Home page" : "User already exists. Click below to go to login/Home page";
        }
      });
    }
  }

  loginClick() {
    this.router.navigate(["/login"]);
  }

  homeClick() {
    this.router.navigate(["/main", ""]);
  }
}
