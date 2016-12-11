import {Routes, RouterModule} from "@angular/router";
import {ProductsListComponent} from "./products-list/products-list.component";
import {NewProductComponent} from "./new-product/new-product.component";
import {RegisterLoginComponent} from "../user/register-login/register-login.component";
import {StartComponent} from "../start.component";
import {AuthAccessGuard} from "../shared/authAccess.guard";

import { LIST_ROUTES } from "./list.routes";
import { CanLeaveGuard } from "../shared/canLeave.guard";
const MAIN_ROUTES : Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: StartComponent},
    // {path: 'productsList', component: ProductsListComponent, canActivate: [AuthAccessGuard]},
    {path: 'productsList', component: ProductsListComponent, canActivate: [AuthAccessGuard], children: LIST_ROUTES},
    {path: 'newProduct', component: NewProductComponent, canActivate: [AuthAccessGuard], canDeactivate: [CanLeaveGuard]},
    {path: 'registerLogin', component: RegisterLoginComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

export const routes = RouterModule.forRoot(MAIN_ROUTES);