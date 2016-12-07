import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../shared/user.service";
import {ProductsService} from "../../shared/products.service";
import {NewProduct} from "../../shared/new-product";
import {CategoriesService} from "../../shared/categories.service";

@Component({
  selector: 'pr-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  // default value for url
  imageUrl: string = '';

  public categories;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private productsService: ProductsService,
              private categoryService: CategoriesService
  ) { }

  ngOnInit() {
      this.categoryService.productsCategories().subscribe(
          (data: any) => {
              console.log(data),
              this.categories = data
          },
                  error => console.log(error)
      )}

  newProductForm = this.formBuilder.group({
      'userId': [this.userService.userData.id, Validators.required],
      'categoryId': ['', Validators.required],
      'name': ['', [Validators.required, Validators.minLength(2)]],
      'description': [],
      'quantity': ['', Validators.required],
      'value': ['', Validators.required],
      'onSale': ['', Validators.required],
      'imageUrl': []
    });

  submitForm(){
    let formValues: NewProduct = this.newProductForm.value;
    console.log(formValues);

    this.productsService.newProducts(formValues).subscribe(
        (data: any) => console.log(data),
        error => console.log(error)
    );
    alert('Product insert in DB');
    this.onCancel();
  }

  onCancel(){
    this.newProductForm.reset();
  }

}
