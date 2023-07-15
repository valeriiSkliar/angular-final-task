import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/iproduct';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MongoService } from 'src/app/core/services/mongo.service';
import { ProductPageService } from 'src/app/core/services/product-page.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-product-component',
	templateUrl: './product-component.component.html',
	styleUrls: ['./product-component.component.css'],
})
export class ProductComponentComponent {
	id: string | undefined;
	collectionBooks = this.listProducts.getBooksInLocalStorage();
	productPage: IProduct | undefined;

	newActiveProduct() {
		//console.log(this.collectionBooks);
		this.collectionBooks.forEach((element) => {
			if (element.id === this.id) {
				this.productPage = element;
				this.activePage.setProductPage(this.productPage);
			}
		});
	}

	// newActiveProduct() {
	// 	const body = { id: 25 }
	// 	this.http.post<string>('http://localhost:3000/get-book', body)
	// 		.subscribe((str) => {
	// 			console.log(str)
	// 			//@ts-ignore
	// 			str.id = str._id;
	// 			//@ts-ignore
	// 			delete str._id;
	// 			//@ts-ignore
	// 			this.productPage = str;
	// 			console.log(str)
	// 		}, (err) => {
	// 			console.log(err)
	// 		})
	// }

	constructor(
		private activeRoute: ActivatedRoute,
		private listProducts: LocalStorageService,
		private activePage: ProductPageService,
		public themeServise: ThemeService,
		private http: HttpClient,
		private mongoService: MongoService,
	) {
		this.id = this.activeRoute.snapshot.params['id'];
		//console.log(this.id)
		this.newActiveProduct();
	}

	// ngOnInit() {
	// 	// const body = { id: 10 };

	// 	// this.http.post<IProduct[]>('http://localhost:3000/delete-book', body).subscribe(
	// 	// 	(str) => {
	// 	// 		console.log('Delete:');
	// 	// 		console.log(str);
	// 	// 		this.mongo.setData(str);
	// 	// 		//this.mongo.fetch()
	// 	// 	},
	// 	// 	(err) => {
	// 	// 		console.log(err);
	// 	// 	},
	// 	// );

	// 	// this.http.get<String>(`http://localhost:3000/active-page?id=${this.id}`).subscribe((str) => {
	// 	// 	console.log(str);
	// 	// })
	// }
}
