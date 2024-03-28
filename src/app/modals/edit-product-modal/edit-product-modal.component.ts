import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/IProduct';
import { CategoriesService } from 'src/app/services/categories.service';
import { NotificationService } from 'src/app/services/notification.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.scss'],
})
export class EditProductModalComponent {
  editProductForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: IProduct,
    public dialogRef: MatDialogRef<EditProductModalComponent>,
    private fb: FormBuilder,
    private orderService: OrderService,
    public categoriesService: CategoriesService,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {
    console.log(product);
    this.editProductForm = this.fb.group({
      nume: [product.name, Validators.required],
      descriere: [product.description, Validators.required],
      imagine: [product.imageUrl, Validators.required],
      cod: [product.productCod, Validators.required],
      numePoe: [product.internalClientCod, Validators.required],
      categorie: [product.category, Validators.required],
      stoc: [product.stoc, Validators.required],
      available: [product.available, Validators.required],
    });
  }

  closeModal() {
    this.dialogRef.close();
  }
  saveModal() {
    if (this.editProductForm.valid) {
      const productPayload = {
        name: this.editProductForm.value.nume,
        description: this.editProductForm.value.descriere,
        imageUrl: this.editProductForm.value.imagine,
        productCod: this.editProductForm.value.cod,
        internalClientCod: this.editProductForm.value.numePoe,
        category: this.editProductForm.value.categorie,
        stoc: this.editProductForm.value.stoc,
        available: this.editProductForm.value.available,
      };

      this.productService
        .updateProduct(this.product.id, productPayload)
        .subscribe({
          next: (response) => {
            this.notificationService.showNotification(
              'Product updated successfully!',
              'success'
            );
            this.closeModal(); // Close the modal if update is successful
          },
          error: (error) => {
            // Handle error case
            this.notificationService.showNotification(
              'Product failed!',
              'error'
            );
          },
        });
    }
  }
  onFileSelected(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files ? element.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.editProductForm.get('imagine')) {
          this.editProductForm.get('imagine')?.setValue(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
