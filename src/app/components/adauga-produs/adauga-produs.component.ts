import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adauga-produs',
  templateUrl: './adauga-produs.component.html',
  styleUrls: ['./adauga-produs.component.scss'],
})
export class AdaugaProdusComponent {
  productForm: FormGroup;
  categories: string[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private authSerivce: AuthService,
    private notificationService: NotificationService,
    private categoriesService: CategoriesService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      available: true,
      category: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      productCod: ['', Validators.required],
      internalClientCod: ['', Validators.required],
      createdByUserId: this.authSerivce.userValue?.loggedUser.id,
      stoc: [, Validators.required],
    });
  }
  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.get('imageUrl')?.setValue(reader.result?.toString());
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.addProduct(this.productForm.value).subscribe(
        (response) => {
          this.notificationService.showNotification(
            'Produs adaugat cu succes',
            'success'
          );
          this.productForm.reset();
        },
        (error) => {
          this.notificationService.showNotification(
            'Eroare la adaugare produs',
            'error'
          );
        }
      );
    }
  }
}
