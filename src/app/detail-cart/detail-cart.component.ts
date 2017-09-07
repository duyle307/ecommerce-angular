import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from "rxjs/Rx";
import { NotificationService } from '../shared/services';
import { ProductService } from '../shared';
import { Product } from '../shared/models';
import { CartService } from '../shared';

@Component({
  selector: 'app-detail-cart',
  templateUrl: './detail-cart.component.html',
  styleUrls: ['./detail-cart.component.scss']
})
export class DetailCartComponent implements OnInit {
  quantity: Array<number>;
  cart: Array<any>;
  subcriptionTotalPrice: Subscription;
  subcriptionCart: Subscription;
  totalPrice:number;
  constructor(
    private notify: NotificationService,
    private productService: ProductService,
    private cartService: CartService
    ) {
    this.totalPrice = 0;
  }

  ngOnInit() {
    this.subcriptionTotalPrice = this.cartService.totalPrice.subscribe(
      (data: any) => {
        this.totalPrice = data;
      }
      );
    this.subcriptionCart = this.cartService.cart.subscribe(
      (data: any) => {
        this.cart = data;
      }
      );
    this.cartService.getToken();
  }

  increaseQuantity(index: number){
    this.cart[index].quantity += 1;
    this.cartService.updateCart(this.cart, 'update');
  }

  descreaseQuantity(index: number){
    if(this.cart[index].quantity > 0){
      this.cart[index].quantity -= 1;
      this.cartService.updateCart(this.cart, 'update');
    }
  }

  deleteCart(product){
    this.cartService.deleteCart(product);
  }

  checkout(){
    // window.open('http://localhost:4200/register', '_blank');  
  }

  ngOnDestroy(){
    if(this.subcriptionTotalPrice != undefined){
      this.subcriptionTotalPrice.unsubscribe();
    }
    if(this.subcriptionCart != undefined){
      this.subcriptionCart.unsubscribe();
    }
  }

}
