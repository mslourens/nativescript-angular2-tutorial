import {Injectable, provide} from '@angular/core';
import {User} from './user';
import {Http, Headers} from '@angular/http';
import {Config} from '../config';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http:Http) {};

  registerUser(user:User) {
    return this.http.post(`${Config.apiUrl}Users`, JSON.stringify({
      Username: user.email,
      Email: user.email,
      Password: user.password
    }), {headers: UserService.getHeaders()})
    .catch(UserService.handleErrors)
  };

  static handleErrors (error: Response) {
    return Observable.throw(error);
  }

  static getHeaders():Headers {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return headers;
  }

  login(user:User) {
    return this.http.post(`${Config.apiUrl}oauth/token`, JSON.stringify({
      username: user.email,
      password: user.password,
      grant_type: 'password'
    }), {headers: UserService.getHeaders()})
        .map(response => response.json())
        .do(data => Config.token = data.Result.access_token)
        .catch(UserService.handleErrors)
  }
}

export const USER_PROVIDERS:Array<any> = [
  {provide: UserService, useValue: UserService}
];