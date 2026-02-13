import { Component, inject, effect,signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common'; // Important for formatting prices
import { AuthService } from '../../auth.service';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  // 1. Add CurrencyPipe and RouterLink to imports
  imports: [CurrencyPipe, RouterLink], 
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  // 2. Inject your services
  public authService = inject(AuthService);
  public cartService = inject(CartService); 
  private router = inject(Router);

  isCheckedOut = signal(false);
  invoiceItems = signal<any[]>([]);
  invoiceTotal = signal(0);
  orderNumber = signal('');

  constructor() {
    effect(() => {
      if (!this.authService.signedIn()) {
        this.router.navigate(['/signin']);
      }
    });
  }

  handleCheckout() {
    // 2. Take a "Snapshot" before we clear the cart
    this.invoiceItems.set(this.cartService.cartItems());
    this.invoiceTotal.set(this.cartService.totalPrice());
    this.orderNumber.set('GF-' + Math.random().toString(36).substr(2, 9).toUpperCase());

    // 3. Clear the selection and show invoice
    this.cartService.clearCart();
    this.isCheckedOut.set(true);
    
    // Scroll to top to see the invoice
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 3. Helper methods to change quantity from the UI
  increaseQty(productId: string) {
    // We can find the product and call addToCart again to increment
    const item = this.cartService.cartItems().find(i => i.product.id === productId);
    if (item) {
      this.cartService.addToCart(item.product);
    }
  }

 decreaseQty(productId: string) {
  // Call the new service method instead of removeFromCart
  this.cartService.decreaseQuantity(productId);
}
}