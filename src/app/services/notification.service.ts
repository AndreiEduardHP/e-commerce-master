import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { INotification } from '../models/INotification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSource = new Subject<INotification | null>();
  public notification$ = this.notificationSource.asObservable();

  constructor() {}

  showNotification(message: string, type: 'success' | 'error' | 'info') {
    const notification: INotification = { message, type };
    this.notificationSource.next(notification);
    setTimeout(() => this.notificationSource.next(null), 5000);
  }
}
