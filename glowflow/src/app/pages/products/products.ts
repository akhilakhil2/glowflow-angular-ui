import { Component,computed ,signal,effect,resource,inject} from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductsComponent } from '../../components/products-component/products-component';
import { ProductDetail } from '../../components/product-detail/product-detail';
import { Product,MakeupData } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductsComponent,ProductDetail],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
 private route = inject(ActivatedRoute);

 params = toSignal(this.route.paramMap.pipe(
    map(params => ({
      category: params.get('categoryName'),
      productId: params.get('productId') // Make sure this matches your app.routes.ts
    }))
  ));
  
  


  productsResource = resource({
    

    loader: () => fetch('/data/makeup.json').then(res => res.json() as Promise<MakeupData>)
  });

  
  displayProducts = computed(() => {
    const data = this.productsResource.value();
    const p = this.params();

    // Guard: If we have an ID, we hide the list. If no data/cat, we return empty.
    if (!data || !p?.category || p?.productId) return []

    const categoryData = data[p.category]; 
    return categoryData ? Object.values(categoryData) : []
  });

selectedProduct = computed(() => {
  const data = this.productsResource.value();
  const p = this.params();

  if (!data || !p?.category || !p?.productId) return undefined; 

  const categoryData = data[p.category];
  
 
  return categoryData ? categoryData[p.productId] || undefined : undefined;
});

}
