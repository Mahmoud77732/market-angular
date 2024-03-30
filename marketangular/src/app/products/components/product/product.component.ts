import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Input() data! : Product;
  @Output() item = new EventEmitter();

  addButton : boolean = false;
  amount : number = 1;

  add(){
    this.item.emit({item: this.data, quantity: this.amount});
    console.log(this.amount);
  }
}
