import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProductsService} from "../shared/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private productsservice: ProductsService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  checkLogin(){
    if(this.userService.userData == null){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    this.cookieService.removeAll();
    this.userService.userData = null;
    this.productsservice.products = null;
    this.router.navigate(['/home']);
  }
}
