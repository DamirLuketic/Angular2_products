import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {ProductsService} from "../../shared/products.service";
import {NewProduct} from "../../shared/new-product";
import {CategoriesService} from "../../shared/categories.service";
import {Observable, Subscription} from "rxjs";
import {Category} from "../../shared/category";
import {Router} from "@angular/router";
import { CanLeave } from "../../shared/canLeave.guard";

@Component({
  selector: 'pr-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit, CanLeave, OnDestroy {

  // default value for url
  public imageUrl: string = '';

  public categories: Category[];
  private subscription: Subscription = null;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private productsService: ProductsService,
              private categoryService: CategoriesService,
              private router: Router
  ) { }

  ngOnInit() {
      if(this.categoryService.categories == null){
          this.subscription = this.categoryService.productsCategories().subscribe(
              (data: any) => {
                  console.log(data),
                      this.categoryService.categories = data,
                      this.categories = data
              },
              error => console.log(error)
          )}else{
          this.categories = this.categoryService.categories;
      }
      }

  newProductForm = this.formBuilder.group({
      'categoryId': ['', Validators.required],
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'description': [],
      'quantity': ['', Validators.required],
      'value': ['', Validators.required],
      'onSale': ['', Validators.required],
      'imageUrl': [this.imageUrl]
    });

  submitForm(){
    let formValues: NewProduct = this.newProductForm.value;
    formValues.userId = this.userService.userData.id;
    console.log(formValues);

    this.productsService.newProducts(formValues).subscribe(
        (data: any) => {
            console.log(data)
            this.productsService.products.push(data)
        },
        error => console.log(error)
    );
    alert('Product insert in DB');
    this.reset();
  }

  reset(){
      this.imageUrl = '';
      this.newProductForm.reset();
  }

    canLeave(){
            if(this.newProductForm.dirty){
                return confirm('Changes are not saved, do you want to leave?');
            }else {
                return true;
            }
    }

    ngOnDestroy(){
        if(this.subscription != null){
            this.subscription.unsubscribe();
        }
    }

}
