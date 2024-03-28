import { Component } from '@angular/core';
import { IAddress } from 'src/app/models/IAddress';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { IProduct } from 'src/app/models/IProduct';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-finalizeaza-comanda',
  templateUrl: './finalizeaza-comanda.component.html',
  styleUrls: ['./finalizeaza-comanda.component.scss'],
})
export class FinalizeazaComandaComponent {
  items: IProduct[] = [];
  codBsr: string = '';
  addresses: IAddress[] = [];
  selectedAddressId: number | null = null;
  count: number = 0;
  currentUser: ILoggedUser | null = null;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private addressService: AddressService,
    private orderService: OrderService,
    private notificationService: NotificationService,
    private componentControlService: ChangeComponentService
  ) {}
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
    this.items = this.cartService.getItems();
  }

  loadAddresses(userId: number | undefined) {
    if (userId !== undefined) {
      this.addressService.loadAddresses(userId).subscribe({
        next: (data) => {
          this.addresses = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    }
  }
  onAddAddress() {
    this.componentControlService.changeComponent('adaugaAdresa');
  }
  showOrder() {
    const userId = this.currentUser?.loggedUser.id;
    const addressId = this.selectedAddressId;
    const products = this.cartService.getItems().map((product) => ({
      ProductId: product.id,
      Quantity: product.quantity,
    }));
    const order = {
      UserId: userId,
      AddressId: addressId,
      Products: products,
      CodBsr: this.codBsr,
    };
    this.orderService.addOrder(order).subscribe({
      next: (response) => {
        console.log(response);
        if (response) {
          this.notificationService.showNotification(
            'Comanda plasata cu succes: ',
            'success'
          );
        }
      },
      error: (error) => {
        if (error) {
          this.notificationService.showNotification(
            'Eroare plasare comanda: ',
            'error'
          );
        }
      },
    });
    this.notificationService.showNotification(
      'Comanda plasata cu succes ! ',
      'success'
    );
    this.cartService.clearCart();
    this.items = [];
  }
}
