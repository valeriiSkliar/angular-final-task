import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
	providedIn: 'root',
})

// Для избежания ситуаций когда данные в корзине будут отличаться от данных которые отображаются
// старайся вызывать методы сервиса только в родительских компонентов.
export class CartService {
	cartItems: { [productId: string]: { product: IProduct; quantity: number } } = {};

	setCartToLocalStorage() {
		localStorage.setItem('ListCart', JSON.stringify(this.cartItems));
	}

	getCartInLocalStorage() {
		const localStorageItem = localStorage.getItem('ListCart');
		if (localStorageItem) {
			this.cartItems = JSON.parse(localStorageItem);
		}
	}

	addCartProduct(product: IProduct, quantity = 1) {
		this.cartItems[product.id] = { product: product, quantity: Number(quantity) };
		this.setCartToLocalStorage();
	}

	getCartList() {
		return Object.values(this.cartItems);
	}

	get totalQuantity() {
		return this.getCartList().reduce((accum, item) => {
			return accum + Number(item.quantity);
		}, 0);
	}

	updateQuantity(id: string, value: number) {
		const item = this.cartItems[id];
		if (value >= 0) {
			if (item) item.quantity = Number(value);
		}
		this.setCartToLocalStorage();
	}

	removeItem(itemId: string) {
		delete this.cartItems[itemId];
		this.setCartToLocalStorage();
	}

	clearCart() {
		this.cartItems = {};
		this.setCartToLocalStorage();
	}
}
