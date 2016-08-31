import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {GroceryService} from '../../shared/grocery/grocery-list.service';
import {IGrocery} from '../../shared/grocery/grocery.interface';
import {TextField} from 'ui/text-field';

let socialShare = require('nativescript-social-share');

@Component({
  selector: 'list',
  templateUrl: 'pages/list/list.html',
  styleUrls: ['pages/list/list-common.css', 'pages/list/list.css'],
  providers: [GroceryService]
})
export class ListPage implements OnInit{
  groceryList:Array<IGrocery> = [];
  grocery:string;
  @ViewChild('groceryTextField') groceryTextField:ElementRef;
  isLoading:boolean = false;
  listLoaded:boolean = false;

  constructor(private groceryService:GroceryService) {}

  ngOnInit() {
    this.isLoading = true;
    this.groceryService.load()
      .subscribe(list => {
        list.forEach((item) => {
          this.groceryList.unshift(item);
        });
        this.isLoading = false;
        this.listLoaded = true;
      });
  }

  add() {
    if (this.grocery.trim() === '') {
      alert('Enter a grocery item');
      return;
    }

    let textField = <TextField>this.groceryTextField.nativeElement;
    textField.dismissSoftInput();

    this.groceryService.add(this.grocery)
      .subscribe(
        groceryObj => {
          this.groceryList.unshift(groceryObj);
        },
        () => {
          alert({
            message: 'An error occurred when saving the item',
            okButtonText: 'OK'
          });
        },
        () => this.grocery = ''
      );
  };

  share() {
    let list:Array<string> = this.groceryList.map(grocery => grocery.name);
    let listString:string = list.join(', ').trim();
    socialShare.shareText(listString);
  }
}