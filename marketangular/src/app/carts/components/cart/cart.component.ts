import { CartsService } from './../../services/carts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartsProducts : any[] = [];
  total : any = 0;
  successCartAdding : boolean = false;

  constructor(private cartsService : CartsService){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartProducts();
  }


  getCartProducts(){
    if("cart" in localStorage){
      this.cartsProducts = JSON.parse(localStorage.getItem("cart")!);
    }
    this.getCartTotal();
  }

  getCartTotal(){
    this.total = 0;
    for(let index in this.cartsProducts){
      this.total += this.cartsProducts[index].item.price * this.cartsProducts[index].quantity;
    }
  }

  plusAmount(index : number){
    this.cartsProducts[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(this.cartsProducts));
    this.getCartTotal();
  }

  minusAmount(index : number){
    this.cartsProducts[index].quantity--;
    localStorage.setItem("cart", JSON.stringify(this.cartsProducts));
    this.getCartTotal();
  }

  detectChange(){
    localStorage.setItem("cart", JSON.stringify(this.cartsProducts));
    this.getCartTotal();
  }

  deleteProduct(index : number){
    this.cartsProducts.splice(index, 1); // delete one item from this start-index
    localStorage.setItem("cart", JSON.stringify(this.cartsProducts));
    this.getCartTotal();
  }

  clearCart(){
    this.cartsProducts = [];
    localStorage.setItem("cart", JSON.stringify(this.cartsProducts));
    this.getCartTotal();
  }

  addCart(){
    let products = this.cartsProducts.map(
      (item) => { return {prodectId: item.item.id, quantity: item.quantity};}
    );
    let model = {userId: 5, date: new Date(), products: products};
    this.cartsService.createNewCart(model).subscribe({
      next : ((response) => {
          this.successCartAdding = true;
          console.log(response);
      }),
      error : ((error) => {this.successCartAdding = false;})
  });
  }

}
