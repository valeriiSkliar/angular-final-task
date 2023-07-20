import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';
import { map, Observable, of } from 'rxjs';
import { CurrencyServiceService } from '../core/services/currency-service.service';
import { ThemeService } from '../core/services/theme.service';
import { HttpClient } from '@angular/common/http';

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

	constructor(
		public currencyService: CurrencyServiceService,
		private listProducts: LocalStorageService,
		public themeServise: ThemeService,
		private http: HttpClient,
	) {}

	ngOnInit() {
		// this.currencyService.selectedCurrency$.subscribe((currency: string) => {
		// 	this.currencyService.setSelectedCurrency(currency);
		// });
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

	// changeCurrency(currency: string) {
	// 	this.currencyService.selectedCurrency$.next(currency);
	// }
}
