import { Component,input ,inject} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart-service';
@Component({
  selector: 'app-products-component',
  imports: [NgOptimizedImage,RouterLink,CurrencyPipe],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent {
products = input<any[]>([]);
private cartService = inject(CartService);
handleAddToBag(event: Event, product: Product) {
    // Prevent the click from navigating to the product detail page
    event.stopPropagation();
    event.preventDefault();

    // Add to the signal-based global state
    this.cartService.addToCart(product);
    
    console.log('Successfully added to selection:', product.name);
  }


}
