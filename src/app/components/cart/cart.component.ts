import { Component } from '@angular/core';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { IProduct } from 'src/app/models/IProduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  items: IProduct[] = [];
  count: number = 0;
  currentUser: ILoggedUser | null = null;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private componentControlService: ChangeComponentService
  ) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
    this.items = this.cartService.getItems();
  }
  finalizeazaComanda(): void {
    this.componentControlService.changeComponent('finalizeazaComanda');
  }
  removeFromCart(product: IProduct) {
    this.cartService.removeFromCart(product);
    this.items = this.cartService.getItems();
    this.count = this.cartService.getItems().length;
  }
  increaseQuantity(product: IProduct) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: IProduct) {
    this.cartService.removeFromCart(product);
    this.items = this.cartService.getItems();
  }
  getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }
  showOrder() {
    const userId = this.currentUser?.loggedUser.id;

    const products = this.cartService.getItems().map((product) => ({
      ProductId: product.id,
      Quantity: product.quantity,
    }));

    const order = {
      UserId: userId,

      Products: products,
    };

    console.log(order);
  }
}
