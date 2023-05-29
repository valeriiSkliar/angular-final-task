import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	constructor(private listProducts: LocalStorageService) {}

	collectionBooks: IProduct[] | undefined;

	ngOnInit() {
		this.collectionBooks = this.listProducts.getBooksInLocalStorage();
	}
}
