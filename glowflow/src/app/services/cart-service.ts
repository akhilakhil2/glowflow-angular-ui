import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model'; // Make sure this path to your model is correct
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items = signal<{ product: Product; quantity: number }[]>([]);

  //  Expose the items as a read-only signal
  cartItems = this.items.asReadonly();

  // Automatically calculate the total count for the Navbar badge
  cartCount = computed(() => 
    this.items().reduce((acc, curr) => acc + curr.quantity, 0)
  );

  // 4. Automatically calculate the total price
  totalPrice = computed(() => 
    this.items().reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0)
  );

  addToCart(product: Product) {
    this.items.update(prevItems => {
      const existing = prevItems.find(i => i.product.id === product.id);
      if (existing) {
        // If it exists, just increase quantity
        return prevItems.map(i => 
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // If new, add it to the list
      return [...prevItems, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string) {
    this.items.update(prev => prev.filter(i => i.product.id !== productId));
  }

  decreaseQuantity(productId: string) {
  this.items.update(prevItems => {
    return prevItems.map(item => {
      // Find the specific product
      if (item.product.id === productId) {
        // Only decrease if quantity is more than 1
        return { ...item, quantity: Math.max(1, item.quantity - 1) };
      }
      return item;
    });
  });
}
clearCart() {
  this.items.set([]); // Resets the signal to an empty array
}
}
