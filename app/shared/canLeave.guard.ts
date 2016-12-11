import {Observable} from "rxjs";
import {CanDeactivate} from "@angular/router";
export interface CanLeave{
    canLeave: () => Observable<boolean> | boolean;
}

export class CanLeaveGuard implements CanDeactivate<CanLeave>{
    canDeactivate(component: CanLeave): Observable<boolean> | boolean{
        return component.canLeave ? component.canLeave() : true;
    }
}