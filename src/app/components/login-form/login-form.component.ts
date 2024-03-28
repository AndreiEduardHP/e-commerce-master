import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Observer } from 'rxjs';
import { BACKEND_URL } from 'src/app/environments/urlConfig';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }
  navigate(path: string) {
    this.router.navigateByUrl(path);
  }
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.notificationService.showNotification(
            'Login successfully ! ',
            'success'
          );
        },
        error: (err) => {
          this.notificationService.showNotification('Login failed !', 'error');
        },
      });
    } else {
      this.notificationService.showNotification(
        'Please fill in all required fields correctly.',
        'error'
      );
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}
