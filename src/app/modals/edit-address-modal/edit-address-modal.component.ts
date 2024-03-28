import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { IAddress } from 'src/app/models/IAddress';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/address.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
})
export class EditAddressModalComponent {
  editAddressForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditAddressModalComponent>,
    private fb: FormBuilder,
    private addressSerivce: AddressService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: IAddress
  ) {
    this.editAddressForm = this.fb.group({
      city: [data.city, Validators.required],
      details: [data.details, Validators.required],
      contactPhoneNumber: [data.contactPhoneNumber, Validators.required],
    });
  }

  saveModal() {
    if (this.editAddressForm.valid) {
      // Include id in the update payload
      const updatePayload = {
        ...this.editAddressForm.value,
        id: this.data.id,
      };

      this.addressSerivce.editAddress(updatePayload).subscribe({
        next: () => {
          this.dialogRef.close();
          this.notificationService.showNotification(
            'Adresa a fost actualizată!',
            'success' // Presupun că vrei să arăți notificarea ca fiind una de succes, nu de eroare.
          );
        },
        error: (error) => {
          this.notificationService.showNotification(
            'A apărut o eroare, te rugăm încearcă din nou!',
            'error'
          );
        },
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
