import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangeComponentService {
  constructor(private router: Router) {}
  private componentChangeSource = new Subject<string>();
  componentChange$ = this.componentChangeSource.asObservable();

  changeComponent(componentKey: string) {
    this.componentChangeSource.next(componentKey);
  }
  // changeComponent(route: string) {
  //   this.router.navigate([route]);
  // }
}
