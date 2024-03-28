import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
  newsLetterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newsLetterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.newsLetterForm.value);
  }
  get f() {
    return this.newsLetterForm.controls;
  }
}
