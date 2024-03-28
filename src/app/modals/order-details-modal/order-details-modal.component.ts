import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IOrder } from 'src/app/models/IOrder';
import { IProduct } from 'src/app/models/IProduct';
import { OrderService } from 'src/app/services/order.service';
import { ProductDetailsModalComponent } from '../product-details-modal/product-details-modal.component';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss'],
})
export class OrderDetailsModalComponent {
  products: IProduct[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public order: IOrder,
    private orderService: OrderService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProductsForOrder(Number(this.order.orderNumber));
  }

  showProductDetails(productId: number): void {
    this.dialog.open(ProductDetailsModalComponent, {
      width: '650px',
      data: productId,
    });
  }
  loadProductsForOrder(orderId: number) {
    this.orderService.getProductsByOrderId(orderId).subscribe({
      next: (products) => {
        console.log(products);
        this.products = products;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }
}
