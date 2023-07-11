import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/iproduct';
import { BehaviorSubject, Observable } from 'rxjs';
import { IComments } from '../../interfaces/comments';

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
	GET_AVERAGE_RATING = 'http://localhost:3000/get-average-rating',
	SET_PRODUCT_RATING = 'http://localhost:3000/set-product-rating',
	ADD_NEW_PRODUCT = 'http://localhost:3000/admin/add-new-product',
	ADD_NEW_COMMENT = 'http://localhost:3000/add-new-comment',
	REMOVE_PRODUCT = 'http://localhost:3000/admin/remove-product',
}

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	private _productsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private _commentsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	private _averageRating: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

	constructor(
		private httpService: HttpClient, // private commentsService: CommentService
	) {
		this.initCommentsCollection();
		this.initAverageRating();
		// this.commentsService.getListComments().map(item => console.log(item))
	}

	fetchData(url: string): Observable<any> {
		return this.httpService.get(url);
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
				this.fetchData(URLS.GET_ALL_ENTRIES).subscribe((data) => {
					this.setProductsCollection(data);
				});
				// console.log(res);
			},
			(error) => {
				console.log(error);
			},
		);
	}

	addComment(comment: IComments) {
		this.httpService.post(URLS.ADD_NEW_COMMENT, { comment }).subscribe(
			(res) => {
				this.fetchData(URLS.GET_ALL_COMMENTS).subscribe((data) => {
					this.setCommentsCollection(data);
				});
				console.log(res);
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
					this.fetchData(URLS.GET_ALL_ENTRIES).subscribe((data) => {
						this.setProductsCollection(data);
					});
				}
			},
			(error) => {
				console.log(error);
			},
		);
	}

	private initAverageRating() {
		this.fetchData(URLS.GET_AVERAGE_RATING).subscribe((data) => {
			this.setAverageRating(data);
		});
	}

	private setAverageRating(data: number) {
		this._averageRating.next(data);
	}

	get averageRating(): Observable<number | null> {
		return this._averageRating.asObservable();
	}
}
