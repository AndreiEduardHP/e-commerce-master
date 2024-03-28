import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateStatusFurnizorComponent } from 'src/app/modals/update-status-furnizor/update-status-furnizor.component';
import { IFurnizor } from 'src/app/models/IFurnizor';
import { FurnizoriService } from 'src/app/services/furnizori.service';

@Component({
  selector: 'app-producatori',
  templateUrl: './producatori.component.html',
  styleUrls: ['./producatori.component.scss'],
})
export class ProducatoriComponent {
  furnizori: IFurnizor[] = [];

  constructor(
    private furnizoriService: FurnizoriService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.furnizoriService.getFurnizori().subscribe((data) => {
      this.furnizori = data;
    });
  }
  editFurnizorStatus(furnizor: IFurnizor) {
    const dialogRef = this.dialog.open(UpdateStatusFurnizorComponent, {
      width: '450px',
      data: furnizor,
    });

    dialogRef.afterClosed().subscribe((result) => {
      //  this.loadAddresses(this.currentUser?.loggedUser.id);
    });
  }
}
