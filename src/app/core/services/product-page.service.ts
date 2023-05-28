import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
	providedIn: 'root',
})
export class ProductPageService {
	productPage: IProduct | undefined;

	setProductPage(product: IProduct) {
		this.productPage = product;
	}

	getProductPage() {
		return this.productPage;
	}
}
