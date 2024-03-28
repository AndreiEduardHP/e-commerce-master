import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdaugaAdresaModalComponent } from 'src/app/modals/adauga-adresa-modal/adauga-adresa-modal.component';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-adauga-adresa-livrare',
  templateUrl: './adauga-adresa-livrare.component.html',
  styleUrls: ['./adauga-adresa-livrare.component.scss'],
})
export class AdaugaAdresaLivrareComponent {
  currentUser: ILoggedUser | null = null;
  adressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AdaugaAdresaModalComponent>,
    private notificationService: NotificationService
  ) {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
    this.adressForm = this.fb.group({
      city: ['', Validators.required],
      details: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
      userId: [this.currentUser?.loggedUser.id, Validators.required], // Asigură-te că acest câmp este completat corect sau gestionat dinamic
    });
  }
  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.adressForm.valid) {
      this.addressService.addAddress(this.adressForm.value).subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            'Adresa adaugata cu succes',
            'success'
          );
          this.dialogRef.close();
        },
        error: (error) => console.error('Error adding address', error),
      });
    }
  }
}
