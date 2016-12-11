import {Component, OnInit, ViewChild, DoCheck, ElementRef} from '@angular/core';
import {UserService} from "../shared/user.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProductsService} from "../shared/products.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'pr-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit, DoCheck {

  // a) Access data from input -> through "(input) = "searchTerm = $event.target.value"
  public searchTerm: string;

  // leftover
    // Access input data through View -> listing in "ngDoCheck"
    // public searchInput: string;
    // @ViewChild('searchValue')
    // 'searchValue': ElementRef;

  // leftover
//   // test if route is "productsList"
//   list = ["/productsList"];
//   route = this.location.path();
//
//   testRoute(){
//     if(this.list.indexOf(this.route) > -1){
//       return true;
//     }else{
//       return false;
//   }
// }

  constructor(private userService: UserService,
              private cookieService: CookieService,
              private productsService: ProductsService,
              private router: Router,
              private location: Location
  ) {}

  ngOnInit() {
  }

  checkLogin(){
    if(this.userService.userData == null){
      return true;
    }else{
      return false;
    }
  }

  ngDoCheck(){

    // b) send data to search term of products service
      // use only in predicted route => save system memory
    if(this.isHidden() == false && this.userService.userData != null){
      this.productsService.searchTerm = this.searchTerm;
    }

    // leftover
    // Listing data from View
    // if(this.searchValue.nativeElement.value != null){
    //   this.searchInput = this.searchValue.nativeElement.value;
    //   console.log(this.searchInput);
    // }

  }

  logOut(){
    this.cookieService.removeAll();
    this.userService.userData = null;
    this.productsService.products = null;
    this.router.navigate(['/home']);
  }

  // c) show component for specific route
    // first check if user is logIn
      // check if one allowed route is activated
  public isHidden() {

    if(this.userService.userData == null){
      return true;
    }

      let list = ["/productsList/viewEdit"];
      let list2 = ["/productsList/viewEditStart"];
      let route = this.location.path();
      // return !(list.indexOf(route) > -1);
      if((list.indexOf(route) > -1) == true || (list2.indexOf(route) > -1) == true){
        return false;
      }else{
        return true;
      }
  }
}
