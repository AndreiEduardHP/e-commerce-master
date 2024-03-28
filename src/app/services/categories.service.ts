import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories: string[] = [
    'KIT PALET REUTILIZAT',
    'ANTICOROSIVE',
    'KIT STANDARD 2020',
    'KIT SPECIFIC',
    'CORNERE',
  ];

  constructor() {}

  getCategories(): string[] {
    return this.categories;
  }
}
