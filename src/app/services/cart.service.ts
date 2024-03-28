import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsInCart: {
    [key: number]: { product: IProduct; quantity: number };
  } = {};
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();
  constructor() {}

  private updateCartCount() {
    const totalCount = Object.values(this.itemsInCart).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.cartCount.next(totalCount);
  }

  addToCart(product: IProduct) {
    if (this.itemsInCart[product.id]) {
      this.itemsInCart[product.id].quantity += 1;
    } else {
      this.itemsInCart[product.id] = { product, quantity: 1 };
    }
    this.updateCartCount();
  }
  removeFromCart(product: IProduct) {
    if (
      this.itemsInCart[product.id] &&
      this.itemsInCart[product.id].quantity > 1
    ) {
      this.itemsInCart[product.id].quantity -= 1;
    } else {
      delete this.itemsInCart[product.id];
    }
    this.updateCartCount();
  }

  getItems() {
    return Object.values(this.itemsInCart).map((item) => ({
      ...item.product,
      quantity: item.quantity,
    }));
  }
  clearCart() {
    this.itemsInCart = [];
    this.updateCartCount(); // Update the cart count to reflect the change
  }
  isProductInCart(productId: number): boolean {
    return !!this.itemsInCart[productId];
  }
  getProductQuantity(productId: number): number {
    return this.itemsInCart[productId]?.quantity || 0;
  }
}
