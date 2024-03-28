import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoggedUser } from '../models/ILoggedUser';
import { ILoginForm } from '../models/ILoginForm';
import { BACKEND_URL } from '../environments/urlConfig';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<ILoggedUser | null>;
  public user: Observable<ILoggedUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.userSubject = new BehaviorSubject<ILoggedUser | null>(
      JSON.parse(localStorage.getItem('user') ?? 'null')
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): ILoggedUser | null {
    return this.userSubject.value;
  }

  login(data: ILoginForm): Observable<ILoggedUser> {
    return this.http
      .post<ILoggedUser>(`${BACKEND_URL}/api/auth/login`, data)
      .pipe(
        tap((user) => {
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.router.navigate(['/default-screen']);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login-screen']);
    this.notificationService.showNotification(
      'Logged out successfully',
      'info'
    );
  }
}
