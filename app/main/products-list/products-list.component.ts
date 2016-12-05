import { Component, OnInit, DoCheck } from '@angular/core';
import {CookieService} from "angular2-cookie/services/cookies.service";
import {UserService} from "../../shared/user.service";
import {ProductsService} from "../../shared/products.service";
import {error} from "util";
import {Product} from "../../shared/product";

@Component({
  selector: 'pr-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, DoCheck {

  public products: Product[] = null;

  constructor(private cookieService: CookieService,
              private userService: UserService,
              private productsService: ProductsService
  ) { }

  ngOnInit() {

    if (this.userService.userData != null) {
      this.productsService.userProducts(+this.userService.userData.id).subscribe(
          (data: any) => {
            this.products = data,
            this.productsService.products = data,
                console.log(data)
          },
          error => console.log(error)
      );
    }
  }

  ngDoCheck() {

  }
}
