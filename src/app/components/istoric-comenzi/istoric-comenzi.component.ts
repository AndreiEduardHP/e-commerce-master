import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from 'src/app/modals/order-details-modal/order-details-modal.component';
import { IOrder } from 'src/app/models/IOrder';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-istoric-comenzi',
  templateUrl: './istoric-comenzi.component.html',
  styleUrls: ['./istoric-comenzi.component.scss'],
})
export class IstoricComenziComponent {
  orders: any = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const userId = this.authService.userValue?.loggedUser.id;
    if (userId === undefined) {
      return;
    }
    this.loadOrders(userId);
  }

  openDialog(order: any): void {
    this.dialog.open(OrderDetailsModalComponent, {
      width: '650px',
      data: order,
    });
  }

  displayedOrders = [];
  private loadMoreStep = 10;
  private currentIndex = 0;
  filterOrderNumber: string = '';
  filterStatus: string = '';
  filterDataReceptie: string = '';
  filterCod: string = '';
  filterDataComanda: string = '';
  filterComanda: string = '';

  get filteredOrders() {
    return this.orders.filter((order: IOrder) => {
      console.log(this.orders);
      const orderIdAsString = order.id.toString();

      return (
        order.orderNumber
          .toLowerCase()
          .includes(this.filterOrderNumber.toLowerCase()) &&
        order.status.toLowerCase().includes(this.filterStatus.toLowerCase()) &&
        (this.filterDataReceptie
          ? order.receiptDate === this.filterDataReceptie
          : true) &&
        (this.filterCod
          ? order.bsrCode.toLowerCase().includes(this.filterCod.toLowerCase())
          : true) &&
        (this.filterDataComanda
          ? order.orderDate
              .toLowerCase()
              .startsWith(this.filterDataComanda.toLowerCase())
          : true) &&
        (this.filterComanda
          ? orderIdAsString.includes(this.filterComanda)
          : true)
      );
    });
  }

  exportToCSV() {
    let csvData = this.convertToCSV(this.orders);
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);

    // Creează un link în document pentru descărcare
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none;');
    a.href = url;
    a.download = 'export-orders.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private convertToCSV(objArray: any[]): string {
    const array = [Object.keys(objArray[0])].concat(objArray);

    return array
      .map((it) => {
        return Object.values(it).toString();
      })
      .join('\n');
  }
  private loadOrders(userId: number) {
    this.orderService.getOrders(userId).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Eroare la preluarea comenzilor:', error);
      },
    });
  }
}
