import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserProductLimit } from 'src/app/models/IUserProductLimit';
import { MonthlyLimitService } from 'src/app/services/monthly-limit.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-edit-monthly-limit',
  templateUrl: './edit-monthly-limit.component.html',
  styleUrls: ['./edit-monthly-limit.component.scss'],
})
export class EditMonthlyLimitComponent {
  editMonthlyLimit: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditMonthlyLimitComponent>,
    private fb: FormBuilder,
    private monthlyLimitService: MonthlyLimitService,

    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: IUserProductLimit
  ) {
    this.editMonthlyLimit = this.fb.group({
      limit: [data.limit, Validators.required],
    });
  }

  saveModal() {
    if (this.editMonthlyLimit.valid) {
      this.monthlyLimitService
        .editLimit(this.data.id, this.editMonthlyLimit.value.limit)
        .subscribe({
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
}
