import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsModalComponent } from 'src/app/modals/product-details-modal/product-details-modal.component';
import { OrderInfoDto } from 'src/app/models/IOrder';
import { AuthService } from 'src/app/services/auth.service';
import { ExportService } from 'src/app/services/export.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss'],
})
export class ClientiComponent {
  orders: OrderInfoDto[] = [];
  filteredOrders: OrderInfoDto[] = [];
  filterOrderNumber: string = '';
  filterStatus: string = '';
  filterAdresa: string = '';
  filterEmailClient: string = '';
  filterDataComanda: string = '';
  filterComanda: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private exportService: ExportService
  ) {}

  ngOnInit() {
    const userId = this.authService.userValue?.loggedUser.id;
    if (userId === undefined) {
      return;
    }
    this.loadOrders(userId);
  }
  changeStatus(orderId: number, newStatus: string) {
    console.log(orderId + newStatus);
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(
      (response) => {
        this.notificationService.showNotification(
          'Status comanda actualizate',
          'success'
        );
      },
      (error) => {
        this.notificationService.showNotification(
          'Ceva nu a mers. Incearca din nou',
          'error'
        );
      }
    );
  }
  get filterOrders() {
    return this.orders.filter((order: OrderInfoDto) => {
      const orderIdAsString = order.orderId.toString();

      return (
        order.orderStatus
          .toLowerCase()
          .includes(this.filterStatus.toLowerCase()) &&
        (this.filterEmailClient
          ? order.customer.email.startsWith(this.filterEmailClient)
          : true) &&
        (this.filterDataComanda
          ? this.formatDate(order.orderDate).includes(this.filterDataComanda)
          : true) &&
        (this.filterOrderNumber
          ? order.orderId === Number(this.filterOrderNumber)
          : true) &&
        order.address.city
          .toLowerCase()
          .includes(this.filterAdresa.toLowerCase())
      );
    });
  }
  openDialogProductDetails(productId: number): void {
    this.dialog.open(ProductDetailsModalComponent, {
      width: '650px',
      data: productId,
    });
  }
  formatDate(date: string) {
    return new Date(date).toLocaleString('ro-RO', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  loadOrders(userId: number) {
    this.orderService.getComenziClienti(userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
  downloadCsv(): void {
    const processedOrders = this.filterOrders.map((order) => {
      // Assuming 'order.products' holds your product data
      const productDetails = order.products
        .map(
          (p) =>
            `${p.name} (Cantitate: ${p.quantity}) (Bucati: ${p.quantity * 8})`
        )
        .join('; ');

      return {
        IdComanda: order.orderId,
        Status: order.orderStatus,
        NumeCompanie: order.customer.company.companyName,
        CuiCompanie: order.customer.company.cui,
        NumarInregistrareCompanie: order.customer.company.registrationNumber,
        DataComanda: this.formatDate(order.orderDate),
        NumeClient: order.customer.firstName + ' ' + order.customer.lastName,
        EmailClient: order.customer.email,
        PersoanaDeContactTelefon: "'" + order.address.contactPhoneNumber,
        Adresa: order.address.city + ', ' + order.address.details,
        ProductDetails: productDetails,
      };
    });

    this.exportService.exportToCsv(processedOrders, 'orders.csv');
  }
}
