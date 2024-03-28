import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAddress } from 'src/app/models/IAddress';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-confirm-delete-address',
  templateUrl: './confirm-delete-address.component.html',
  styleUrls: ['./confirm-delete-address.component.scss'],
})
export class ConfirmDeleteAddressComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteAddressComponent>,

    private addressSerivce: AddressService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: IAddress
  ) {}
  closeModal() {
    this.dialogRef.close();
  }

  deleteAddress(addressId: number) {
    this.addressSerivce.deleteAddress(addressId).subscribe({
      next: () => {
        this.notificationService.showNotification(
          'Adresa stearsa cu succes !',
          'success'
        );
        this.closeModal();
      },
      error: (error) => {
        this.notificationService.showNotification(
          'A aparut o eroare te rugam incearca din nou !',
          'error'
        );
      },
    });
  }
}
