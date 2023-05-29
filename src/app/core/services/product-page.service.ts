import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
	providedIn: 'root',
})
export class ProductPageService {
	productPage: IProduct = {
		id: 'string',
		name: 'string',
		description: 'string',
		price: 0,
		imageUrls: [''],
	};

	setProductPage(product: IProduct) {
		this.productPage = product;
	}

	getProductPage() {
		return this.productPage;
	}
}
