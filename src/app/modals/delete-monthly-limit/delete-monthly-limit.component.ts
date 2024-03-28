import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserProductLimit } from 'src/app/models/IUserProductLimit';
import { MonthlyLimitService } from 'src/app/services/monthly-limit.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-delete-monthly-limit',
  templateUrl: './delete-monthly-limit.component.html',
  styleUrls: ['./delete-monthly-limit.component.scss'],
})
export class DeleteMonthlyLimitComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteMonthlyLimitComponent>,

    private monthlyService: MonthlyLimitService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: IUserProductLimit
  ) {}
  closeModal() {
    this.dialogRef.close();
  }

  deleteAddress(limitId: number) {
    this.monthlyService.deleteLimit(limitId).subscribe({
      next: () => {
        this.notificationService.showNotification(
          'Limita a fost stearsa',
          'success'
        );
        this.closeModal();
      },
      error: (err) => {
        this.notificationService.showNotification('A aparut o eroare', 'error');
      },
    });
  }
}
