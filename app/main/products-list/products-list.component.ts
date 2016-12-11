import {Component, OnInit, DoCheck} from '@angular/core';
import {UserService} from "../../shared/user.service";
import {ProductsService} from "../../shared/products.service";
import {error} from "util";
import {Product} from "../../shared/product";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, DoCheck {

  // import products
  public products: Product[] = null;

  // meet the requirement
  public termProducts: Product[];

  // find current view product => for adding class on selector
  public currentViewId: number = 0;

  constructor(private userService: UserService,
              private productsService: ProductsService,
              private router: Router
  ) {}

  catchProducts(){
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

  ngOnInit() {
    // catch data of products => but only one time
    if(this.productsService.products == null){
      this.catchProducts();
    }
  }

  // e) function for testing term
  findMatch(name: string, term: string){
    if(name.indexOf(term) !== -1){
      return true;
    }else{
      return false;
    }
  }


  isInArray(productId: number) {
     if(this.productsService.deletedProductsId.indexOf(productId) > -1){
       return true;
     }else{
       return false;
     }
  }


  ngDoCheck() {

    // reset "termProducts" and add products with no id in array of id's from deleted products
      // if search term is set
    this.termProducts = [];

    if(this.productsService.products != null){
      for(let product of this.productsService.products){

        if(this.productsService.searchTerm != null){
          if(this.findMatch(product.name, this.productsService.searchTerm)) {
            if (this.isInArray(product.id) == false) {
              this.termProducts.push(product);
            }
        }
          }else{
            if (this.isInArray(product.id) == false) {
              this.termProducts.push(product);
          }
        }

      }
    }
  }

  // view product details
  viewProduct(product: Product){
    // currentViewId => for add class on selector of current selected product
    this.currentViewId = product.id;
    this.productsService.currentProduct = product;
    this.router.navigate(['productsList', 'viewEdit']);
  }

  removeProductFromList(productId: number){
    this.productsService.products.splice(productId, 1);
    console.log(this.productsService.products);
    this.termProducts = this.productsService.products;
  }

  deleteProduct(productId: number){

    this.productsService.deletedProductsId.push(productId);
    // last deleted Id => use for removing view if current view product is deleted
    this.productsService.lastDeletedId = productId;
    console.log('Deleted products (by product id): ' + this.productsService.deletedProductsId);
    this.productsService.deleteProduct(productId).subscribe(
        (data: any) =>
            console.log(data),
            error => console.log(error)
    );
  }
}
