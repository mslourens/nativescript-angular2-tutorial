import {Component} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from 'nativescript-angular/router';

@Component({
  selector: "main",
  template: '<page-router-outlet></page-router-outlet>',
  directives: [NS_ROUTER_DIRECTIVES]
})
export class AppComponent {
  
}