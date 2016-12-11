import {Routes} from "@angular/router";
import {ViewEditComponent} from "./view-edit/view-edit.component";
import {ViewEditStartComponent} from "./view-edit-start.component";

export  const LIST_ROUTES: Routes = [
    {path: '', redirectTo: 'viewEditStart', pathMatch: 'full'},
    {path: 'viewEditStart', component: ViewEditStartComponent},
    {path: 'viewEdit', component: ViewEditComponent},
    {path: '**', redirectTo: 'viewEditStart', pathMatch: 'full'}
];