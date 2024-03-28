import { Component } from '@angular/core';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-show-role',
  templateUrl: './show-role.component.html',
  styleUrls: ['./show-role.component.scss'],
})
export class ShowRoleComponent {
  currentUser: ILoggedUser | null = null;
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }
  showNotification() {
    this.notificationService.showNotification('ef', 'error');
  }
}
