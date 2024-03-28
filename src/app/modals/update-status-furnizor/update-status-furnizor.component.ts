import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IFurnizor } from 'src/app/models/IFurnizor';
import { FurnizoriService } from 'src/app/services/furnizori.service';

@Component({
  selector: 'app-update-status-furnizor',
  templateUrl: './update-status-furnizor.component.html',
  styleUrls: ['./update-status-furnizor.component.scss'],
})
export class UpdateStatusFurnizorComponent {
  new: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public furnizor: IFurnizor,
    public dialogRef: MatDialogRef<UpdateStatusFurnizorComponent>,
    private furnizoriService: FurnizoriService
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
  toggleStatus(): void {
    const newStatus = !this.furnizor.isDisabled;
    this.furnizoriService
      .updateUserStatus(this.furnizor.id, newStatus)
      .subscribe(() => {
        this.furnizor.isDisabled = newStatus; // Update local status to reflect change
        // Optionally, you could also refresh the data or close the modal and refresh the list outside
      });
  }
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ro-RO');
  }
}
