import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/iproduct';
import { IComments } from '../interfaces/comments';

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	listProducts: IProduct[] | undefined;
	listComments: IComments[] | undefined;

	constructor(public http: HttpClient) {}

	public fetchDataBook(): Promise<any> {
		return this.http.get('http://localhost:3000/home-page').toPromise();
		// return new Promise<IProduct[]>((resolve, reject) => {
		//   this.http.get<IProduct[]>('http://localhost:3000/home-page')
		//     .subscribe((data) => {

		//       for (let i = 0; i < data.length; i+=1) {
		//         //const { _id } = data[i];
		//         //data[i].id = _id;
		//         const { _id, ...updatedObj } = data[i];
		//         //updatedObj.id = _id;
		//         data[i] = updatedObj;
		//         //console.log(updatedObj)
		//         //@ts-ignore
		//         //data[i].id = data[i]._id;
		//          //@ts-ignore
		//         //delete data[i]._id;
		//       }
		//       resolve(data);
		//     })
		//})
	}

	public fetchDataComment(): Promise<any> {
		return this.http.get('http://localhost:3000/get-comment').toPromise();
	}

	setDataComment(data: IComments[]) {
		this.listComments = data;
		console.log(this.listComments);
	}

	setCommentMongo(comment: IComments) {
		const body = { comment };
		console.log(body);
		this.http.post<IComments[]>('http://localhost:3000/add-comment', body).subscribe(
			(str) => {
				//console.log('Delete:');
				console.log(str);
				//this.setDataComment(str);
				//this.mongo.fetch()
			},
			(err) => {
				console.log(err);
			},
		);
	}

	// public fetch() {
	//   this.http.get<IProduct[]>('http://localhost:3000/home-page')
	//   .subscribe((data) => {this.setData(data)})

	// }
	deleteBookMongo(id: string) {
		const body = { id };
		//console.log(body)

		this.http.post<IProduct[]>('http://localhost:3000/delete-book', body).subscribe(
			(str) => {
				//console.log('Delete:');
				//console.log(str);
				this.setDataBook(str);
				//this.mongo.fetch()
			},
			(err) => {
				console.log(err);
			},
		);
	}

	setBookMongo(product: IProduct) {
		const body = { product };
		//console.log(body)
		this.http.post<IProduct[]>('http://localhost:3000/add-book', body).subscribe(
			(str) => {
				//console.log('Delete:');
				//console.log(str);
				this.setDataBook(str);
				//this.mongo.fetch()
			},
			(err) => {
				console.log(err);
			},
		);
	}

	setDataBook(data: IProduct[]) {
		this.listProducts = data;
		//console.log(this.listProducts);
	}
}
