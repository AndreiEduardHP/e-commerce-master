import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BACKEND_URL } from 'src/app/environments/urlConfig';
import { IAddress } from 'src/app/models/IAddress';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAddressModalComponent } from 'src/app/modals/edit-address-modal/edit-address-modal.component';
import { ResetPasswordModalComponent } from 'src/app/modals/reset-password-modal/reset-password-modal.component';
import { AdaugaAdresaModalComponent } from 'src/app/modals/adauga-adresa-modal/adauga-adresa-modal.component';
import { ConfirmDeleteAddressComponent } from 'src/app/modals/confirm-delete-address/confirm-delete-address.component';

@Component({
  selector: 'app-informatii-personale',
  templateUrl: './informatii-personale.component.html',
  styleUrls: ['./informatii-personale.component.scss'],
})
export class InformatiiPersonaleComponent {
  addresses: IAddress[] = [];
  currentUser: ILoggedUser | null = null;

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private componentControlService: ChangeComponentService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {}
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
  }
  adaugaAdresa(): void {
    const dialogRef = this.dialog.open(AdaugaAdresaModalComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
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
  resetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '450px',
      data: this.currentUser?.loggedUser.id,
    });
  }
  editAddress(address: IAddress) {
    const dialogRef = this.dialog.open(EditAddressModalComponent, {
      width: '450px',
      data: address, // Trimite datele adresei către dialog, dacă este necesar
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
  }
  deleteAddress(address: IAddress) {
    const dialogRef = this.dialog.open(ConfirmDeleteAddressComponent, {
      width: '450px',
      data: address, // Trimite datele adresei către dialog, dacă este necesar
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadAddresses(this.currentUser?.loggedUser.id);
    });
  }
}
