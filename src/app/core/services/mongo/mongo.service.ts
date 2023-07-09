import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';
import { IProduct } from '../../interfaces/iproduct';
import { BehaviorSubject, Observable } from 'rxjs';

export function extractProducts(data: any[]): IProduct[] {
	return data.map((item) => {
		const { description, url, id, imageUrls, name, price } = item;
		return { description, url, id, imageUrls, name, price };
	});
}

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	private _productsCollection: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor(private httpService: HttpClient) // private localStorageService: LocalStorageService,
	{}

	fetchData(): Observable<any> {
		return this.httpService.get('http://localhost:3000/get-all-products');
	}

	setProductsCollection(data: any) {
		this._productsCollection.next(data);
	}

	get productsCollection(): Observable<any> {
		return this._productsCollection.asObservable();
	}

	addProduct(product: IProduct) {
		this.httpService.post('http://localhost:3000/admin/add-new-product', { product }).subscribe(
			(res) => {
				this.fetchData().subscribe((data) => {
					this.setProductsCollection(data);
				});
				console.log(res);
			},
			(error) => {
				console.log(error);
			},
		);
	}
}
