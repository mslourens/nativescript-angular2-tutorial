import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Config} from '../config';
import {Observable} from 'rxjs/Rx';
import {Grocery} from './grocery';
import {IGrocery} from "./grocery.interface";

@Injectable()
export class GroceryService {
  constructor(private http:Http) {}

  load() {
    return this.http.get(`${Config.apiUrl}Groceries`, {headers: GroceryService.getHeaders()})
      .map(response => response.json())
      .map(data => {
        let groceryList:Array<IGrocery> = [];
        data.Result.forEach((item) => groceryList.push(new Grocery(item.Id, item.Name)));
        return groceryList;
      })
      .catch(GroceryService.handleErrors);
  }

  add(groceryItem:string) {
    return this.http.post(`${Config.apiUrl}Groceries`, JSON.stringify({Name: groceryItem}), {headers: GroceryService.getHeaders()})
      .map(res => res.json())
      .map(data => {
        return new Grocery(data.Result.Id, groceryItem)
      })
      .catch(GroceryService.handleErrors);
  }

  static handleErrors (error: Response) {
    console.log(JSON.stringify(error.json()));
    return Observable.throw(error);
  }

  static getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + Config.token);
    headers.append('Content-Type', 'application/json');

    return headers;
  }
}