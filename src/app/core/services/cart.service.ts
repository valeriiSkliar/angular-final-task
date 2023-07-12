import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { LocalStorageService } from './local-storage.service';
import { ICartItems } from '../interfaces/icart-items';
import { BehaviorSubject } from 'rxjs';
import { MongoService } from './mongo/mongo.service';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	cartItems: ICartItems = {};
	cartItems$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private localStorage: LocalStorageService, private mongoStorage: MongoService) {
		this.mongoStorage.cart.subscribe((data) => {
			this.cartItems$.next(data);
		});
	}

	getCartItems() {
		this.cartItems$.subscribe((data) => console.log(data));
		const result = {};
		// this.cartItems = this.localStorage.getCartInLocalStorage();
		return this.cartItems$.getValue();
	}

	addCartProduct(product: IProduct, quantity = 1) {
		this.mongoStorage.addProductToCart(product.id, quantity);
		const { id } = product;
		if (isNaN(quantity)) {
			quantity = 1;
		}
		if (this.cartItems[id]) {
			this.cartItems[id] = { product: product, quantity: this.cartItems[id].quantity + Number(quantity) };
		} else {
			this.cartItems[id] = { product: product, quantity: Number(quantity) };
		}
		// this.localStorage.setCartToLocalStorage(this.cartItems);
	}

	getCartList() {
		const ids = this.cartItems$.getValue().items;

		// return this.localStorage.getBooksByIds(ids);
		return Object.values(this.cartItems);
	}

	getBooksByIds(ids: { productId: string; quantity: string }[]): any[] {
		return ids.map(({ productId, quantity }) => {
			const iProduct = this.localStorage.listProducts.find(({ id }) => id === productId);
			return { product: iProduct, quantity: quantity };
		});
		// return this.listProducts.filter((book) => ids.includes(book['productId']));
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
		// this.localStorage.setCartToLocalStorage(this.cartItems);
	}

	removeItem(itemId: string) {
		delete this.cartItems[itemId];
		// this.localStorage.setCartToLocalStorage(this.cartItems);
	}

	clearCart() {
		this.cartItems = {};
		// this.localStorage.setCartToLocalStorage(this.cartItems);
	}
}
