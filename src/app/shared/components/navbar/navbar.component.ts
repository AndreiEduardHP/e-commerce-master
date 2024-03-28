import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  currentUser: ILoggedUser | null = null;
  constructor(
    private router: Router,
    public translate: TranslateService,
    private authService: AuthService,
    private componentControlService: ChangeComponentService
  ) {}
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }
  goToCart() {
    this.componentControlService.changeComponent('cart');
  }
  goToPersonalInfo() {
    this.componentControlService.changeComponent('informatiiPersonale');
  }
  navigate() {
    if (this.authService.userValue) {
      this.router.navigate(['/default-screen']);
    } else {
      this.router.navigate(['/login-screen']);
    }
  }
  logout(): void {
    this.authService.logout();
  }
  get isLoggedIn(): boolean {
    return !!this.authService.userValue;
  }
}
