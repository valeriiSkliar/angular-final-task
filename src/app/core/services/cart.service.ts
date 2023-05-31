import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
	providedIn: 'root',
})

// Для избежания ситуаций когда данные в корзине будут отличаться от данных которые отображаются
// старайся вызывать методы сервиса только в родительских компонентов.
export class CartService {
	cartItems: { [productId: string]: { product: IProduct; quantity: number } } = {};

	addCartProduct(product: IProduct, quantity = 1) {
		this.cartItems[product.id] = { product: product, quantity: quantity };
	}

	getCartList() {
		return Object.values(this.cartItems);
	}

	get totalQuantity() {
		return this.getCartList().reduce((accum, item) => {
			return accum + item.quantity;
		}, 0);
	}

	// decreaseQuantity(id: string) {
	// 	const item = this.cartItems[id];
	// 	if (item && item.quantity > 0) item.quantity -= 1;
	// }
	//
	// increaseQuantity(id: string) {
	// 	const item = this.cartItems[id];
	// 	if (item) item.quantity += 1;
	// }
	updateQuantity(id: string, value: number) {
		const item = this.cartItems[id];
		if (value >= 0) {
			if (item) item.quantity = value;
		}
	}

	removeItem(itemId: string) {
		delete this.cartItems[itemId];
	}

	clearCart() {
		this.cartItems = {};
	}
}
