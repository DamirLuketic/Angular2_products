import {CanActivate} from "@angular/router";
import {UserService} from "./user.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthAccessGuard implements CanActivate{

    constructor(private userService: UserService){}

    canActivate(){
        if(this.userService.userData != null){
            return true;
        }else{
            return false;
        }
    }
}
