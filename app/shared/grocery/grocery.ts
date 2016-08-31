import {IGrocery} from "./grocery.interface";

export class Grocery implements IGrocery {
  id:string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}