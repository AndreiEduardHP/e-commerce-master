import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteMonthlyLimitComponent } from 'src/app/modals/delete-monthly-limit/delete-monthly-limit.component';
import { EditMonthlyLimitComponent } from 'src/app/modals/edit-monthly-limit/edit-monthly-limit.component';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { IProduct } from 'src/app/models/IProduct';
import {
  IUserProductLimit,
  IUserProductLimitPayLoad,
} from 'src/app/models/IUserProductLimit';
import { AuthService } from 'src/app/services/auth.service';
import { MonthlyLimitService } from 'src/app/services/monthly-limit.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-monthly-limit',
  templateUrl: './monthly-limit.component.html',
  styleUrls: ['./monthly-limit.component.scss'],
})
export class MonthlyLimitComponent implements OnInit {
  products: IProduct[] = [];
  userProductLimits: IUserProductLimit[] = [];
  users: any[] = [];
  currentUserId: number | undefined;
  monthlyLimitValue: number = 0;
  selectedUserId: number = 0;
  selectedProductId: number = 0;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private monthlyLimitSerivce: MonthlyLimitService,
    private dialog: MatDialog
  ) {
    this.currentUserId = this.authService.userValue?.loggedUser.id;
  }

  ngOnInit() {
    this.getProducts();
    this.getUsers(this.currentUserId);
    this.getLimits();
  }
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  getUsers(userId: number | undefined): void {
    this.userService.getUsers(userId).subscribe(
      (data: ILoggedUser[]) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  saveMonthlyLimit(): void {
    const newLimit: IUserProductLimitPayLoad = {
      userId: this.selectedUserId,
      productId: this.selectedProductId,
      limit: this.monthlyLimitValue,
      count: 0,
    };
    this.monthlyLimitSerivce.addLimit(newLimit).subscribe(
      (response) => {
        this.getLimits();
      },
      (error) => {
        console.error('Error adding limit', error);
      }
    );
    this.notificationService.showNotification(
      `Contul selectat a fost limitat`,
      'success'
    );
    this.monthlyLimitValue = 0;
    this.selectedProductId = 0;
    this.selectedUserId = 0;
  }
  getLimits() {
    this.monthlyLimitSerivce.getLimits().subscribe(
      (data) => {
        this.userProductLimits = data;
        const matchingProducts = [];

        for (let item of data) {
          if (item.userId === this.currentUserId) {
            matchingProducts.push({
              productId: item.productId,
              limit: item.limit,
            });
          }
        }
      },
      (error) => {
        console.error('There was an error retrieving the limits', error);
      }
    );
  }
  openMonthlyLimitEditDialog(limit: IUserProductLimit) {
    const dialogRef = this.dialog.open(EditMonthlyLimitComponent, {
      width: '650px',
      data: limit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getLimits();
    });
  }
  deleteLimit(limit: IUserProductLimit) {
    const dialogRef = this.dialog.open(DeleteMonthlyLimitComponent, {
      width: '650px',
      data: limit,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getLimits();
    });
  }
}
