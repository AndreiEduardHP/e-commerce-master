import { Component } from '@angular/core';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { IProduct } from 'src/app/models/IProduct';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { MonthlyLimitService } from 'src/app/services/monthly-limit.service';
import { NotificationService } from 'src/app/services/notification.service';

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
    private componentControlService: ChangeComponentService,
    private monthlyLimitService: MonthlyLimitService,
    private notificationService: NotificationService
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
    this.monthlyLimitService.getLimitsForUser(2).subscribe((limits) => {
      const productLimit = limits.find(
        (limit) => limit.productId === product.id
      );
      if (productLimit) {
        const currentQuantity = this.cartService.getProductQuantity(product.id);
        if (currentQuantity < productLimit.limit) {
          this.cartService.addToCart(product);
        } else {
          this.notificationService.showNotification(
            `Limita pentru produsul ${product.name} a fost atinsă.`,
            'error'
          );
        }
      } else {
        this.cartService.addToCart(product);
      }
    });
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
