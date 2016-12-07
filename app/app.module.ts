import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NavbarTopComponent} from "./navbar-top/navbar-top.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {MainComponent} from "./main/main.component";
import {ProductsListComponent} from "./main/products-list/products-list.component";
import {routes} from "./main/main.routes";
import {NewProductComponent} from "./main/new-product/new-product.component";
import {DropdownDirective} from "./shared/dropdown.directive";
import {RegisterLoginComponent} from "./user/register-login/register-login.component";
import {UserService} from "./shared/user.service";
import {RootService} from "./shared/root.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ProductsService} from "./shared/products.service";
import {StartComponent} from "./start.component";
import {Ng2PaginationModule} from "ng2-pagination";
import {AuthAccessGuard} from "./shared/authAccess.guard";
import {CategoriesService} from "./shared/categories.service";

@NgModule({
  declarations: [
    AppComponent,
      NavbarTopComponent,
      SideBarComponent,
      MainComponent,
      ProductsListComponent,
      NewProductComponent,
      DropdownDirective,
      RegisterLoginComponent,
      StartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
      routes,
      Ng2PaginationModule
  ],
  providers: [UserService, RootService, CookieService, ProductsService, AuthAccessGuard, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
