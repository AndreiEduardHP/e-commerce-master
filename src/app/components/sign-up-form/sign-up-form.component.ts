import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BACKEND_URL } from 'src/app/environments/urlConfig';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  currentUser: ILoggedUser | null;
  user = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    rol: '',
    username: '',
    companyId: 0,
  };
  company = {
    companyName: '',
    cui: '',
    registrationNumber: '',
  };
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private companyService: CompanyService,
    private authService: AuthService
  ) {
    this.currentUser = authService.userValue;
  }
  onSubmit() {
    this.createCompany();
    console.log(this.user);
  }
  resetUser() {
    // Reset user to its initial state
    this.user = {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      rol: '',
      username: '',
      companyId: 0,
    };
  }
  sendEmail(to: string, body: string) {
    return this.http.post(`${BACKEND_URL}/api/email/send`, { to, body });
  }
  createProfile(user: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    companyId: number;
  }) {
    return this.http.post(`${BACKEND_URL}/api/UserProfile`, user);
  }
  createCompany() {
    this.companyService.createCompany(this.company).subscribe({
      next: (response) => {
        this.user.companyId = response.id;
        this.createProfile(this.user).subscribe({
          next: (response) => {
            this.notificationService.showNotification(
              'Profil creat cu succes',
              'success'
            );
            // Pasul 2: Trimiterea email-ului, după crearea cu succes a profilului
            this.sendEmail(
              this.user.email,
              'Contul tău a fost creat cu succes!'
            ).subscribe({
              next: (response) => {
                this.notificationService.showNotification(
                  'Email trimis cu success',
                  'success'
                );
                this.resetUser();
              },
              error: (error) =>
                this.notificationService.showNotification(
                  'Eroare la trimiterea mailului',
                  'error'
                ),
            });
          },
          error: (error) => {
            if (error.status === 422) {
              this.notificationService.showNotification(
                'Cont existent',
                'error'
              );
            } else {
              this.notificationService.showNotification(
                'Eroare la crearea profilului',
                'error'
              );
            }
          },
        });
      },
      error: (error) => {
        console.error('A apărut o eroare', error);
      },
    });
  }
}
