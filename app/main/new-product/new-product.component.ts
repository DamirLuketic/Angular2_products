import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {ProductsService} from "../../shared/products.service";
import {NewProduct} from "../../shared/new-product";
import {CategoriesService} from "../../shared/categories.service";
import {Observable} from "rxjs";
import {Category} from "../../shared/category";
import {Router} from "@angular/router";

@Component({
  selector: 'pr-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  // default value for url
  public imageUrl: string = '';

  public categories: Category[];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private productsService: ProductsService,
              private categoryService: CategoriesService,
              private router: Router
  ) { }

  ngOnInit() {
      if(this.categoryService.categories == null){
          this.categoryService.productsCategories().subscribe(
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



}
