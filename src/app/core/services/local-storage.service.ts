import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { extractProducts, MongoService } from './mongo/mongo.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	public listProducts: IProduct[] = [];
	public listProducts$ = new BehaviorSubject<IProduct[]>([]);
	listCart!: object;

	constructor(private mongoService: MongoService) {
		this.mongoService.productsCollection
			.pipe(
				map((value) => {
					return extractProducts(value);
				}),
			)
			.subscribe((value) => {
				this.listProducts = value; // после перевода всего приложения на поток
				// необходимо удалить
				this.listProducts$.next(value);
			});
		// if (!localStorage.getItem('ListBooks')) {
		// 	localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
		// 	this.listProducts = JSON.parse(localStorage.getItem('ListBooks')!);
		// }
		if (String(localStorage.getItem('ListCart')) === 'null') {
			localStorage.setItem('ListCart', JSON.stringify({}));
			this.listCart = JSON.parse(localStorage.getItem('ListCart')!);
		}
	}

	// add one Book to DataBase
	setBooksInLocalStorage(product: IProduct) {
		this.mongoService.addProduct(product);

		// const checkProductID = this.listProducts.find((item) => {
		// 	return item.id === product.id;
		// });
		// if (!checkProductID) {
		// 	this.listProducts.push(product);
		// }
		// localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
	}

	getBooksInLocalStorage() {
		// const localStorageItem = localStorage.getItem('ListBooks');
		// if (localStorageItem) {
		// 	this.listProducts = JSON.parse(localStorageItem);
		// }
		// this.listProducts.forEach((book) => {
		// 	if (book.imageUrls.length === 0) {
		// 		book.imageUrls.push('./assets/no-photo.png');
		// 	}
		// });
		return this.listProducts;
	}

	saveAfterRemove() {
		localStorage.setItem('ListBooks', JSON.stringify(this.listProducts));
	}

	removeBook(id: string) {
		this.mongoService.removeProduct(id);
		// this.listProducts.forEach((element) => {
		// 	if (element.id === id) {
		// 		const index = this.listProducts.indexOf(element);
		// 		this.listProducts.splice(index, 1);
		// 	}
		// });
	}

	setCartToLocalStorage(cartItems: { [productId: string]: { product: IProduct; quantity: number } }) {
		const extractData = (data: { [productId: string]: { product: IProduct; quantity: number } }): any[] => {
			return Object.entries(data).map(([key, value]) => {
				return { id: value.product.id, quantity: value.quantity };
			});
		};
		// console.log(extractData(cartItems))
		localStorage.setItem('ListCart', JSON.stringify(cartItems));
	}

	getBooksByIds(ids: { productId: string; quantity: string }[]): any[] {
		return ids.map(({ productId, quantity }) => {
			const iProduct = this.listProducts.find(({ id }) => id === productId);
			return { product: iProduct, quantity: quantity };
		});
		// return this.listProducts.filter((book) => ids.includes(book['productId']));
	}

	popularBooks(bookIds: string[]) {
		if (bookIds.length) {
			return this.listProducts.filter((book) => bookIds.includes(book.id));
		} else {
			const randomIndex = Math.floor(Math.random() * this.listProducts.length);
			return [this.listProducts[randomIndex]];
		}
	}
}
