import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.scss'
})
export class ProductsDetailsComponent implements OnInit {

  id : any;
  data : any = {};
  loading : boolean = false;

  constructor(private productsService : ProductsService, private activatedRoute : ActivatedRoute){
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getProduct();
  }

  getProduct(){
    this.loading = true;
    this.productsService.getProductById(this.id).subscribe({
      next : ((response : any) => {
        this.data = response;
        this.loading = false;
      }),
      error : ((err : any) => {
        this.loading = false;
        alert(err);
      }),
      complete : (() => {})
    });
  }

}
