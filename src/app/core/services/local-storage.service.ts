import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { MongoService } from './mongo.service';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	private listProducts: IProduct[] = [];
	listCart!: object;

	constructor(private mongoService: MongoService) {
		this.listProducts = this.mongoService.listProducts!;
		if (String(localStorage.getItem('ListCart')) === 'null') {
			localStorage.setItem('ListCart', JSON.stringify({}));
			this.listCart = JSON.parse(localStorage.getItem('ListCart')!);
		}
	}

	getBooksInLocalStorage() {
		this.listProducts = this.mongoService.listProducts!;
		this.listProducts.forEach((book) => {
			if (book.imageUrls.length === 0) {
				book.imageUrls.push('./assets/no-photo.png');
			}
		});
		return this.listProducts;
	}

	setCartToLocalStorage(cartItems: { [productId: string]: { product: IProduct; quantity: number } }) {
		localStorage.setItem('ListCart', JSON.stringify(cartItems));
	}

	getCartInLocalStorage() {
		return (this.listCart = JSON.parse(localStorage.getItem('ListCart')!));
	}

	getTotalBooksCount() {
		return this.listProducts.length;
	}

	getBooksByIds(ids: string[]): IProduct[] {
		if (ids.length) {
			return this.listProducts.filter((book) => ids.includes(book.id));
		} else {
			const randomIndex = Math.floor(Math.random() * this.listProducts.length);
			return [this.listProducts[randomIndex]];
		}
	}
}
