import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.scss']
})
export class ShoppinglistComponent implements OnInit {
showdiv: boolean = true;

products: any = [{name: "car", id:"c"},{name: "bus", id:"b"},{name: "jeep", id:"j"}]


  constructor() { }

  ngOnInit(): void {
  }

}
