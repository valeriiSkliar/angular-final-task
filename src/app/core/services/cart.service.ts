import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})

// Для избежания ситуаций когда данные в корзине будут отличаться от данных которые отображаются
// старайся вызывать методы сервиса только в родительских компонентов.
export class CartService {
	cartItems: { [productId: string]: { product: IProduct; quantity: number } } = {};

	constructor(private localStorage: LocalStorageService) {}

	getCartItems() {
		this.cartItems = this.localStorage.getCartInLocalStorage();
	}

	addCartProduct(product: IProduct, quantity = 1) {
		const { id } = product;
		if (isNaN(quantity)) {
			quantity = 1;
		}
		if (this.cartItems[id]) {
			this.cartItems[id] = { product: product, quantity: this.cartItems[id].quantity + Number(quantity) };
		} else {
			this.cartItems[id] = { product: product, quantity: Number(quantity) };
		}
		this.localStorage.setCartToLocalStorage(this.cartItems);
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
		console.log(id, value);
		const item = this.cartItems[id];
		if (value >= 0) {
			if (item) item.quantity = Number(value);
		}
		this.localStorage.setCartToLocalStorage(this.cartItems);
	}

	removeItem(itemId: string) {
		delete this.cartItems[itemId];
		this.localStorage.setCartToLocalStorage(this.cartItems);
	}

	clearCart() {
		this.cartItems = {};
		this.localStorage.setCartToLocalStorage(this.cartItems);
	}
}
