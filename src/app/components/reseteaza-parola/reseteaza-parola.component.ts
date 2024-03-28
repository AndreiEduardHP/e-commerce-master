import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordModalComponent } from 'src/app/modals/reset-password-modal/reset-password-modal.component';
import { ILoggedUser } from 'src/app/models/ILoggedUser';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reseteaza-parola',
  templateUrl: './reseteaza-parola.component.html',
  styleUrls: ['./reseteaza-parola.component.scss'],
})
export class ReseteazaParolaComponent {
  resetPasswordForm!: FormGroup;
  submitted = false;
  currentUserId: number | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
    private authService: AuthService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ResetPasswordModalComponent>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.currentUserId = this.authService.userValue?.loggedUser.id;
    this.resetPasswordForm = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validator: this.mustMatch('newPassword', 'confirmPassword'),
      }
    );
  }
  mustMatch(newPassword: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const newPasswordControl = formGroup.controls[newPassword];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']
      ) {
        return;
      }

      if (newPasswordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }
  onSubmit() {
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }

    let userId = 0;
    if (this.currentUserId == null) {
      this.notificationService.showNotification(
        'Te rugam incearca din nou',
        'error'
      );
      return;
    } else {
      userId = this.currentUserId;
    }
    const { oldPassword, newPassword } = this.resetPasswordForm.value;
    console.log({ oldPassword, newPassword });
    this.resetPasswordService
      .resetPassword(userId, oldPassword, newPassword)
      .subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            'Parola schimbata cu succes',
            'success'
          );
          this.resetPasswordForm.reset();
        },
        error: (error) => {
          if (error.status === 400) {
            this.notificationService.showNotification(
              'Parola veche incorecta',
              'error'
            );
          } else
            this.notificationService.showNotification(
              'A aparut o eroare incarca din nou',
              'error'
            );
        },
      });
  }

  // Funcție helper pentru a accesa ușor câmpurile formularului în template
  get f() {
    return this.resetPasswordForm.controls;
  }
}
