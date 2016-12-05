import {Routes, RouterModule} from "@angular/router";
import {ProductsListComponent} from "./products-list/products-list.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {RegisterLoginComponent} from "../user/register-login/register-login.component";
import {StartComponent} from "../start.component";
const MAIN_ROUTES : Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: StartComponent},
    {path: 'productsList', component: ProductsListComponent},
    {path: 'newProduct', component: NewProductComponent},
    {path: 'registerLogin', component: RegisterLoginComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const routes = RouterModule.forRoot(MAIN_ROUTES);