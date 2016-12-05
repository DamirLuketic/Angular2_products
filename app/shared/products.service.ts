import { Injectable } from '@angular/core';
import {RootService} from "./root.service";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { Product } from "./product";

@Injectable()
export class ProductsService {

  public products: Product[] = null;

  constructor(
      private rootService: RootService,
      private http: Http
  ) { }

  private handleError(error: any){
    return Observable.throw(error.json());
  }

  userProducts(userId: number){
    const body = JSON.stringify(userId);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.rootService.apiUrl + 'api/user_products/' + userId, body, {headers: headers}).
        map((response: Response) => response.json()).
        catch(this.handleError);
  }

}
