import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss'],
})
export class ProductDetailsModalComponent {
  product: IProduct | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public productId: number,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductDetailsModalComponent>
  ) {}
  ngOnInit() {
    this.loadProductDetails(this.productId);
  }
  closeModal() {
    this.dialogRef.close();
  }
  loadProductDetails(productId: number) {
    this.productService.getProductById(productId).subscribe({
      next: (product: IProduct) => {
        this.product = product;
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }
}
