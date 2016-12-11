import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {Product} from "../../shared/product";
import {ProductsService} from "../../shared/products.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {Category} from "../../shared/category";
import {CategoriesService} from "../../shared/categories.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'pr-view-edit',
  templateUrl: './view-edit.component.html',
  styleUrls: ['./view-edit.component.css']
})
export class ViewEditComponent implements OnInit, DoCheck, OnDestroy {

  public currentProduct: Product;
  public lastDeletedId: number;
  public editProductForm: FormGroup;
  public categories: Category[];
  private subscription: Subscription;

  constructor( private productsService: ProductsService,
               private formBuilder: FormBuilder,
               private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.lastDeletedId = this.productsService.lastDeletedId;
    this.currentProduct = this.productsService.currentProduct;

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

    this.createForm();
  }

  ngDoCheck(){
    this.lastDeletedId = this.productsService.lastDeletedId;
    if(this.currentProduct != this.productsService.currentProduct){
      this.currentProduct = this.productsService.currentProduct;
      this.createForm();
    }
  }

  createForm(){

    let category_id: number;
    let name: string = '';
    let description: string = '';
    let quantity;
    let value;
    let onSale;

    if(this.currentProduct != null){
      category_id = this.currentProduct.category_id;
      name = this.currentProduct.name;
      description = this.currentProduct.description;
      quantity = this.currentProduct.quantity;
      value = this.currentProduct.value;
      onSale = this.currentProduct.on_sale;
    }

    this.editProductForm = this.formBuilder.group({
      'category_id': [category_id, Validators.required],
      'name': [name, [Validators.required, Validators.minLength(2)]],
      'description': [description],
      'quantity': [quantity, Validators.required],
      'value': [value, Validators.required],
      'on_sale': [onSale, Validators.required]
    });
  }

  submitForm(){

    const editProduct: Product = this.editProductForm.value;
    editProduct.id = this.currentProduct.id;


    for(let product of this.productsService.products){
      if(product.id == this.currentProduct.id){
        product.category_id = editProduct.category_id;
        product.name = editProduct.name;
        product.value = editProduct.value;
        product.quantity = 1;
        product.description = editProduct.description;
        product.on_sale = editProduct.on_sale;
      }
    }

    this.productsService.editProduct(editProduct).subscribe(
        (data: any) => console.log(data),
        error => console.log(error)
    );
  }

  ngOnDestroy(){
    if(this.subscription.unsubscribe()){
      this.subscription.unsubscribe();
    }
  }

}
