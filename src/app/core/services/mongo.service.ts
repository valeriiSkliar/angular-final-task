import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { IComments } from '../interfaces/comments';
import { IReting } from '../interfaces/ireting';

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	listProducts: IProduct[] | undefined;
	listComments: IComments[] | undefined;
	listReting: IReting[] | undefined;
	averageRating = 0;
	totalComments = 0;

	constructor(public http: HttpClient) {}

	getTotalDeleteCount(data: IComments[]) {
		let sum = 0;
		data.forEach((book) => {
			sum += book.comments.length;
		});
		this.totalComments = sum;
	}

	getTotalCommentsCount() {
		let sum = 0;
		this.listComments!.forEach((book) => {
			sum += book.comments.length;
		});
		this.totalComments = sum;
	}

	getAverageRating() {
		let length = 0;
		let totalSum = 0;
		this.listReting!.forEach((reting: IReting) => {
			length += reting.arrReting.length;
		});
		for (let i = 0; i < this.listReting!.length; i++) {
			for (let j = 0; j < this.listReting![i].arrReting.length; j++) {
				totalSum += this.listReting![i].arrReting[j];
			}
		}
		if (isNaN(Number((totalSum / length).toFixed(1)))) {
			this.averageRating = 0;
		} else {
			this.averageRating = Number((totalSum / length).toFixed(1));
		}
	}

	public fetchDataBook(): Promise<any> {
		return this.http.get('http://localhost:3000/home-page').toPromise();
	}

	public fetchDataComment(): Promise<any> {
		return this.http.get('http://localhost:3000/get-comment').toPromise();
	}

	public fetchDataReting(): Promise<any> {
		return this.http.get('http://localhost:3000/get-reting').toPromise();
	}

	setRetingMongo(reting: IReting) {
		const body = { reting };
		this.http.post<IReting[]>('http://localhost:3000/add-reting', body).subscribe(
			(str) => {
				this.setDataReting(str);
			},
			(err) => {
				console.log(err);
			},
		);
	}

	setDataReting(data: IReting[]) {
		this.listReting = data;
		this.getAverageRating();
	}

	setDataComment(data: IComments[]) {
		this.listComments = data;
		this.getTotalCommentsCount();
		this.getTotalDeleteCount(data);
	}

	setCommentMongo(comment: IComments) {
		const body = { comment };
		this.http.post<IComments[]>('http://localhost:3000/add-comment', body).subscribe(
			(str) => {
				this.setDataComment(str);
			},
			(err) => {
				console.log(err);
			},
		);
	}

	getCommentMongo() {
		this.http.get<IComments[]>('http://localhost:3000/get-comment').subscribe((str) => {
			this.setDataComment(str);
		});
	}

	getReitingMongo() {
		this.http.get<IReting[]>('http://localhost:3000/get-reting').subscribe((str) => {
			this.setDataReting(str);
		});
	}

	deleteBookMongo(id: string) {
		const body = { id };
		this.http.post<IProduct[]>('http://localhost:3000/delete-book', body).subscribe(
			(str) => {
				this.setDataBook(str);
			},
			(err) => {
				console.log(err);
			},
		);
	}

	setBookMongo(product: IProduct) {
		const body = { product };
		this.http.post<IProduct[]>('http://localhost:3000/add-book', body).subscribe(
			(str) => {
				this.setDataBook(str);
			},
			(err) => {
				console.log(err);
			},
		);
	}

	setDataBook(data: IProduct[]) {
		this.listProducts = data;
	}
}
