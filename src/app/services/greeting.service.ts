import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GreetingService {
  constructor() {}

  getGreetingMessage(): string {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Bună dimineața';
    } else if (hour < 18) {
      return 'Bună ziua';
    } else {
      return 'Bună seara';
    }
  }
}
