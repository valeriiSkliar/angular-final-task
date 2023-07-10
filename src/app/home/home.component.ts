import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';
import { map, Observable, of } from 'rxjs';
import { CurrencyServiceService } from '../core/services/currency-service.service';
import { ThemeService } from '../core/services/theme.service';
import { HttpClient } from '@angular/common/http';

type Info = { name: string; age: number };
type Animal = { name: string; breed: string; age: number };

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
	user: Info | undefined;
	cat: Animal | undefined;

	constructor(
		public currencyService: CurrencyServiceService,
		private listProducts: LocalStorageService,
		public themeServise: ThemeService,
		private http: HttpClient,
	) {}

	ngAfterViewInit() {
		console.log('check');
	}

	ngOnInit() {
		this.currencyService.selectedCurrency$.subscribe((currency: string) => {
			this.currencyService.setSelectedCurrency(currency);
		});

		this.collectionObservable = of(this.listProducts.getBooksInLocalStorage()).pipe(
			map((products) => {
				this.collectionNew = products;
				return products;
			}),
		);
		this.collectionBooks = this.listProducts.getBooksInLocalStorage();
		this.liveCollectionBooks = this.collectionBooks;

		//console.log('ngOnInit');

		// this.http.get<Info>('/assets/info.json').subscribe((info) => {
		// 	this.user = info;
		// 	console.log(this.user);
		// })

		// this.http.get<Animal>('/assets/animal.json').subscribe((animal) => {
		// 	this.cat = animal;
		// 	console.log(this.cat);
		// })

		// this.http.get<String>('http://localhost:3000/sum?num1=10&num2=15').subscribe((str) => {
		// 	console.log(str);
		// })

		// this.http.get<String>('http://localhost:3000/home-page').subscribe((str) => {
		// 	console.log(str);
		// })

		// const body = { name: 'Zhora', breed: "britan", age: 5 }

		// this.http.post<{ saveTime: number }>('http://localhost:3000/addcat', body)
		// 	.subscribe(({ saveTime }) => {
		// 		console.log('Day:' + saveTime)
		// 	}, (err) => {
		// 		console.log(err)
		// 	})
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

	changeCurrency(currency: string) {
		this.currencyService.selectedCurrency$.next(currency);
	}
}
