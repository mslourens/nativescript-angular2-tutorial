import {nativeScriptBootstrap} from "nativescript-angular/application";
import {AppComponent} from "./app.component";
import {NS_HTTP_PROVIDERS} from 'nativescript-angular/http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

nativeScriptBootstrap(AppComponent, [
  NS_HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS
]);