import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {LoginData} from "./login-data";
import {RootService} from "./root.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {UserData} from "./user-data";
import {RegistrationData} from "./registration-data";


@Injectable()
export class UserService{

  userData = null;

  constructor(private http: Http, private rootService: RootService) { }

  // function for catching error and sending through Observable (json format)-> implement in "http" requests
  private handleError(error: any){
    return Observable.throw(error.json());
  }

  register(registrationData: RegistrationData){
    const body = JSON.stringify(registrationData);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiUrl + 'api/register/' + registrationData, body, {headers: headers}).
    map((response: Response) => response.json()).
        catch(this.handleError);
  }

  login(loginData: LoginData){
    const body = JSON.stringify(loginData);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiUrl + 'api/logIn/' + loginData, body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

}
