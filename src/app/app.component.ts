import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'e-commerce';

  constructor(
    private primengConfig: PrimeNGConfig,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ro']);
    translate.setDefaultLang('en');
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
