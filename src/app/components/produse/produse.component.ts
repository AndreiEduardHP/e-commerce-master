import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ChangeComponentService } from 'src/app/services/change-component.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-produse',
  templateUrl: './produse.component.html',
  styleUrls: ['./produse.component.scss'],
})
export class ProduseComponent implements OnInit {
  products: IProduct[] = [];
  categories: string[] = [];
  displayedProducts: IProduct[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  countProduse = 0;
  private cartSubscription: Subscription | undefined;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private componentControlService: ChangeComponentService,
    private notificationService: NotificationService,
    private categoriesService: CategoriesService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.countProduse = this.cartService.getItems().length;
    this.categories = this.categoriesService.getCategories();
  }

  get filteredProducts() {
    return this.products.filter(
      (order) =>
        order.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        order.category
          .toLowerCase()
          .includes(this.selectedCategory.toLowerCase())
    );
  }
  addToCart(product: IProduct): void {
    this.cartService.addToCart(product);
    this.countProduse = this.cartService.getItems().length;
    this.notificationService.showNotification(
      `${product.name} a fost adaugat in cos`,
      'success'
    );
  }
  getProducts(): void {
    this.productService.getProducts().subscribe(
      (data: IProduct[]) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  isProductInCart(productId: number): boolean {
    return this.cartService.isProductInCart(productId);
  }
  increaseQuantity(product: IProduct) {
    this.cartService.addToCart(product);
  }

  decreaseQuantity(product: IProduct) {
    this.cartService.removeFromCart(product);
  }
  getProductQuantity(productId: number): number {
    return this.cartService.getProductQuantity(productId);
  }
  onShoppingCartClick(): void {
    this.componentControlService.changeComponent('cart');
  }
  filterCategory(category: string): void {
    this.selectedCategory = category;
  }
  resetFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
  }
}
