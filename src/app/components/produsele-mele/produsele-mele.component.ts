import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EditProductModalComponent } from 'src/app/modals/edit-product-modal/edit-product-modal.component';
import { IProduct } from 'src/app/models/IProduct';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produsele-mele',
  templateUrl: './produsele-mele.component.html',
  styleUrls: ['./produsele-mele.component.scss'],
})
export class ProduseleMeleComponent implements OnInit {
  products: IProduct[] = [];
  http: any;
  currentUserId!: number;
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      const currentUser = user;
      if (currentUser == null || currentUser.loggedUser.rol !== 'furnizor') {
        return;
      }
      this.currentUserId = currentUser?.loggedUser.id;
      this.loadMyProducts(currentUser?.loggedUser.id);
    });
  }

  loadMyProducts(userId: number): void {
    this.productService.getMyProducts(userId).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        this.notificationService.showNotification(
          'A aparut o eroare te rugam incearca iar',
          'error'
        );
      }
    );
  }
  toggleAvailability(productId: number, isAvailable: boolean) {
    this.productService
      .updateProductAvailability(productId, isAvailable)
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            'Produs modificat cu succes',
            'success'
          );
        },
        error: (error) => {
          this.notificationService.showNotification(
            'A aparut o eroare te rugam incearca iar',
            'success'
          );
        },
      });
  }
  openDialog(product: any): void {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '650px',
      data: product,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadMyProducts(this.currentUserId);
    });
  }
}
