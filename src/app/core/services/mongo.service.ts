import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

interface Ff {
	id: string;
}

@Injectable({
	providedIn: 'root',
})
export class MongoService {
	listProducts: IProduct[] | undefined;

	constructor(public http: HttpClient) {}

	public fetchData(): Promise<any> {
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

	// public fetch() {
	//   this.http.get<IProduct[]>('http://localhost:3000/home-page')
	//   .subscribe((data) => {this.setData(data)})

	// }
	setData(data: IProduct[]) {
		this.listProducts = data;
		console.log(this.listProducts);
	}
}
