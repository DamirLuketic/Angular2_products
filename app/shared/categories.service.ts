import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {RootService} from "./root.service";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import { Category } from "./category";

@Injectable()
export class CategoriesService {

  public categories: Category[] = null;

  constructor(private http: Http,
              private rootService: RootService
  ) { }

  private handleError(error: any){
    return Observable.throw(error.json());
  }

  productsCategories(){
    return this.http.get(this.rootService.apiUrl + 'api/categories').
    map((response: Response) => response.json()).
        catch(this.handleError);
  }
}
