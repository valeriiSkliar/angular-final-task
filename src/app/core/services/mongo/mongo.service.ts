import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/iproduct';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { IComments } from '../../interfaces/comments';
import { debounce } from 'rxjs/internal/operators/debounce';

export function extractProducts(data: any[]): IProduct[] {
	return data.map((item) => {
		const { description, url, id, imageUrls, name, price } = item;
		return { description, url, id, imageUrls, name, price };
	});
}
export function extractComments(data: any[]) {
	return data.map((item) => {
		const { comments, id } = item;
		return { comments, id };
	});
}

export enum URLS {
	GET_ALL_ENTRIES = 'http://localhost:3000/get-all-products',
	GET_ALL_COMMENTS = 'http://localhost:3000/get-all-comments',
	GET_AVERAGE_RATING = 'http://localhost:3000/api/rating/get-average-rating',
	GET_PRODUCT_RATING = 'http://localhost:3000/api/rating/get',
	GET_CART = 'http://localhost:3000/api/cart',
	ADD_PRODUCT_TO_CART = 'http://localhost:3000/api/cart/add',
	UPDATE_PRODUCT_IN_CART = 'http://localhost:3000/api/cart/update',
	INCREMENT_PRODUCT_QUANTITY = 'http://localhost:3000/api/cart/increment',
	DECREMENT_PRODUCT_QUANTITY = 'http://localhost:3000/api/cart/decriment',
	REMOVE_PRODUCT_FROM_CART = 'http://localhost:3000/api/cart/remove',
	CLEAR_CART = 'http://localhost:3000/api/cart/clear',
	SET_PRODUCT_RATING = 'http://localhost:3000/api/rating',
	ADD_NEW_PRODUCT = 'http://localhost:3000/admin/add-new-product',
	ADD_NEW_COMMENT = 'http://localhost:3000/add-new-comment',
	REMOVE_PRODUCT = 'http://localhost:3000/admin/remove-product',
}

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	private _productsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private _cart: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private _commentsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private _averageRating: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	constructor(private httpService: HttpClient) {
		this.initCommentsCollection();
		this.initAverageRating();
		this.initCart();
	}

	fetchData(url: string, options = ''): Observable<any> {
		return this.httpService.get(`${url}/${options}`);
	}

	private postData(URL: URLS, options: string, body: any[]) {
		const [quantity] = body;
		return this.httpService.post(`${URL}/${options}`, { quantity });
	}

	private deleteData(url: URLS, options = '') {
		return this.httpService.delete(`${url}/${options}`);
	}

	setProductsCollection(data: any) {
		this._productsCollection.next(data);
	}

	get productsCollection(): Observable<any> {
		return this._productsCollection.asObservable();
	}

	initCommentsCollection = () => {
		this.fetchData(URLS.GET_ALL_COMMENTS).subscribe((data) => {
			this.setCommentsCollection(data);
		});
	};

	setCommentsCollection(data: any) {
		this._commentsCollection.next(data);
	}

	get commentsCollection(): Observable<any> {
		return this._commentsCollection.asObservable();
	}

	addProduct(product: IProduct) {
		this.httpService.post(URLS.ADD_NEW_PRODUCT, { product }).subscribe(
			() => {
				this.fetchData(URLS.GET_ALL_ENTRIES)
					.pipe(debounce(() => timer(300)))
					.subscribe((data) => {
						this.setProductsCollection(data);
					});
			},
			(error) => {
				console.log(error);
			},
		);
	}

	addComment(comment: IComments) {
		this.httpService.post(URLS.ADD_NEW_COMMENT, { comment }).subscribe(
			(res) => {
				this.fetchData(URLS.GET_ALL_COMMENTS)
					.pipe(debounce(() => timer(300)))
					.subscribe((data) => {
						this.setCommentsCollection(data);
					});
			},
			(error) => {
				console.log(error);
			},
		);
	}

	removeProduct(id: string) {
		return this.httpService.post(URLS.REMOVE_PRODUCT, { id }).subscribe(
			(res: any) => {
				if (id === res.id) {
					this.fetchData(URLS.GET_ALL_ENTRIES)
						.pipe(debounce(() => timer(300)))
						.subscribe((data) => {
							this.setProductsCollection(data);
						});
				}
			},
			(error) => {
				console.log(error);
			},
		);
	}

	initAverageRating() {
		this.fetchData(URLS.GET_AVERAGE_RATING)
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => {
				this.setAverageRating(data);
			});
	}

	private setAverageRating(data: number) {
		this._averageRating.next(data);
	}

	get averageRating(): Observable<number> {
		return this._averageRating.asObservable();
	}

	getProductRating(productId: string): Observable<number> {
		return this.fetchData(URLS.GET_PRODUCT_RATING, productId);
	}

	submitRating(productId: string, rating: number): Observable<any> {
		return this.postData(URLS.SET_PRODUCT_RATING, productId, [rating]);
	}

	// CART

	private initCart() {
		return this.fetchData(URLS.GET_CART)
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => this.setCart(data));
	}

	setCart(data: any) {
		this._cart.next(data);
	}

	get cart(): Observable<any> {
		return this._cart.asObservable();
	}

	addProductToCart(productId: string, quantity: number) {
		this.postData(URLS.ADD_PRODUCT_TO_CART, productId, [quantity])
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => {
				this.setCart(data);
			});
	}
	updateProductInCart(productId: string, quantity: number) {
		this.postData(URLS.UPDATE_PRODUCT_IN_CART, productId, [quantity])
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => {
				this.setCart(data);
			});
	}

	clearCart() {
		this.deleteData(URLS.CLEAR_CART)
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => {
				this.setCart(data);
			});
	}

	removeItemFromCart(productId: string) {
		this.deleteData(URLS.REMOVE_PRODUCT_FROM_CART, productId)
			.pipe(debounce(() => timer(300)))
			.subscribe((data) => {
				this.setCart(data);
			});
	}
}
