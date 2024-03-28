import { Component, OnInit } from '@angular/core';
import { INotification } from 'src/app/models/INotification';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification: any;

  constructor(private notificationService: NotificationService) {}
  ngOnInit() {
    this.notificationService.notification$.subscribe((notification) => {
      console.log(notification);
      this.notification = notification;
    });
  }
}
