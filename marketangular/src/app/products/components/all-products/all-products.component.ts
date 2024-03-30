import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {

  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts : any[] = [];

  constructor(private productsService: ProductsService) {
    this.getProducts();
    this.getCategories();
  }

  ngOnInit(): void {
  }

  getProducts() {
    this.loading = true;
    this.productsService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
      },
      (error: any) => {
        this.loading = false;
        alert("error");
        console.log(error.message);
      }
    );
  }

  getCategories() {
    this.loading = true;
    this.productsService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        alert("error");
        console.log(error.message);
      }
    );
  }


  filterCategory(event: any) {
    this.loading = true;
    let value = event.target.value;
    console.log(value);
    if (value == "all") {
      this.getProducts();
      this.loading = false;
    }
    else {
      this.getCategoryproducts(value);
      this.loading = false;
    }
  }

  getCategoryproducts(keyword: string) {
    this.loading = true;
    this.productsService.getProductByCategory(keyword).subscribe(
      (response: any) => {
        this.products = response;
        this.loading = false;
      }
    );
  }

  /*
   . JSON.stringify(); // send data
   . JSON.parse(); // get data
   . from "product.component.ts": "add()" => event={item, quantity}
  */
  addToCart(event: any){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let exist = this.cartProducts.find(
        (theItem) => {
          return theItem.item.id == event.item.id;
        }
      );
      if(exist){
        alert("Product is already in your cart!");
      }
      else{
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }

}
