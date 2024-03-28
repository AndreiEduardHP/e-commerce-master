import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdaugaAdresaModalComponent } from 'src/app/modals/adauga-adresa-modal/adauga-adresa-modal.component';
import { IAddress } from 'src/app/models/IAddress';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { IProduct } from 'src/app/models/IProduct';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { MonthlyLimitService } from 'src/app/services/monthly-limit.service';
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
    private componentControlService: ChangeComponentService,
    private monthlyService: MonthlyLimitService,
    private dialog: MatDialog
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
    const dialogRef = this.dialog.open(AdaugaAdresaModalComponent, {
      width: '650px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
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
    for (const product of products) {
      console.log('wwwww');
      this.updateProductCount(
        product.ProductId,
        order.UserId,
        product.Quantity
      );
    }
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
  updateProductCount(
    productId: number,
    userId: number | undefined,
    newCount: number
  ) {
    this.monthlyService.updateCount(productId, userId, newCount).subscribe({
      next: (response) => {
        console.log('Numărul a fost actualizat cu succes.', response);
        // Aici poți să adaugi orice logică adițională după actualizarea cu succes
      },
      error: (error) => {
        console.error('A apărut o eroare la actualizare.', error);
        // Aici poți să adaugi gestionarea erorilor
      },
    });
  }
}
