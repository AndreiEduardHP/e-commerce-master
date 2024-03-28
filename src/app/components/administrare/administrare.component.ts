import { Component } from '@angular/core';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administrare',
  templateUrl: './administrare.component.html',
  styleUrls: ['./administrare.component.scss'],
})
export class AdministrareComponent {
  currentUser: ILoggedUser | null;
  creazaCont: boolean;
  producatori: boolean;
  monthlyLimit: boolean;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.userValue
      ? this.authService.userValue
      : null;
    if (this.currentUser?.loggedUser.rol === 'furnizor') {
      this.creazaCont = false;
      this.monthlyLimit = true;
    } else {
      this.creazaCont = true;
      this.monthlyLimit = false;
    }

    this.producatori = false;
  }

  showCreazaCont() {
    this.creazaCont = true;
    this.producatori = false;
    this.monthlyLimit = false;
  }

  showProducatori() {
    this.creazaCont = false;
    this.producatori = true;
    this.monthlyLimit = false;
  }
  showMonthlyLimit() {
    this.creazaCont = false;
    this.producatori = false;
    this.monthlyLimit = true;
  }
}
