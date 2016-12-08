import {Component, OnInit, DoCheck} from '@angular/core';
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

  // import products
  public products: Product[] = null;

  // meet the requirement
  public termProducts;

  constructor(private userService: UserService,
              private productsService: ProductsService
  ) {}

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

  // function for testin term
  findMatch(name: string, term: string){
    if(name.indexOf(term) !== -1){
      return true;
    }else{
      return false;
    }
  }

  ngDoCheck() {

    // put all products if no term
    this.termProducts = this.products;

    // if term exists
    if(this.productsService.searchTerm != null){
      // set products list to null
      this.termProducts = [];

              for(let product of this.products){
        // if product meet the requirement
            if(this.findMatch(product.name, this.productsService.searchTerm)){
              this.termProducts.push(product);
        }
      }
    }
  }

}
