import { Injectable } from '@angular/core';
import { Product } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class ProductPageService {
	productPage: Product | undefined;

	setProductPage(product: Product) {
		this.productPage = product;
	}

	getProductPage() {
		return this.productPage;
	}
}
