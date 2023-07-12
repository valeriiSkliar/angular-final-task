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

	addCartProduct(product: IProduct | undefined, quantity = 1) {
		if (product) {
			this.mongoStorage.addProductToCart(product.id, Number(quantity));
		}
	}

	getCartList() {
		return Object.values(this.cartItems);
	}

	getBooksByIds(ids: { productId: string; quantity: string }[]): any[] {
		return ids.map(({ productId, quantity }) => {
			const iProduct = this.localStorage.listProducts.find(({ id }) => id === productId);
			return { product: iProduct, quantity: quantity };
		});
	}

	getIProductByID(productId: string): IProduct | undefined {
		return this.localStorage.listProducts.find(({ id }) => id === productId);
	}

	removeItem(itemId: string) {
		delete this.cartItems[itemId];
	}

	clearCart() {
		this.mongoStorage.clearCart();
	}

	removeItemFromCart(itemId: string) {
		this.mongoStorage.removeItemFromCart(itemId);
	}

	updateProductInCart(productId: string, quantity: number) {
		this.mongoStorage.updateProductInCart(productId, quantity);
	}
}
