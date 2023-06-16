import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';
import { map, Observable, of } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	search = '';
	filterInput = ''; // new
	collectionBooks: IProduct[] | undefined;
	liveCollectionBooks: IProduct[] | undefined;
	collectionObservable?: Observable<IProduct[] | null>; // new
	collectionNew: IProduct[] = []; // new
	filter!: string; // new
	noMatches = false;

	constructor(private listProducts: LocalStorageService) {}

	ngOnInit() {
		this.collectionObservable = of(this.listProducts.getBooksInLocalStorage()).pipe(
			map((products) => {
				this.collectionNew = products;
				return products;
			}),
		);
		this.collectionBooks = this.listProducts.getBooksInLocalStorage();
		this.liveCollectionBooks = this.collectionBooks;
	}

	onInput() {
		if (this.search.length === 0) {
			this.liveCollectionBooks = this.collectionBooks;
		} else {
			const regExp = new RegExp(this.search, 'gi');
			this.liveCollectionBooks = this.collectionBooks;
			this.liveCollectionBooks = (this.liveCollectionBooks as IProduct[]).filter((book) => regExp.test(book.name));
		}
	}

	filterProductsByName() {
		this.filter = this.filterInput;
	}

	scrollPageUp() {
		window.scrollTo({
			top: 0,
		});
	}
}
