import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	cartItems: { [productId: string]: { product: IProduct; quantity: number } } = {};
	constructor() // private productService: ProductService,
	// private localStorageService: LocalStorageService
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	{}

	addCartProduct(product: IProduct) {
		this.cartItems[product.id] = { product: product, quantity: 1 };
		// console.log(this.cartItems)
	}

	getCartList() {
		return Object.values(this.cartItems);
	}

	get totalQuantity() {
		return this.getCartList().reduce((accum, item) => {
			return accum + item.quantity;
		}, 0);
	}

	decreaseQuantity(id: string) {
		const item = this.cartItems[id];
		if (item && item.quantity > 0) item.quantity -= 1;
	}

	increaseQuantity(id: string) {
		const item = this.cartItems[id];
		if (item) item.quantity += 1;
	}
	updateQuantity(id: string, value: number) {
		const item = this.cartItems[id];
		if (value >= 0) {
			if (item) item.quantity = value;
		}
	}
}
