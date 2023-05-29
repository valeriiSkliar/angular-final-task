import { Component } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
	productList: IProduct[] = [];

	constructor(private localStorageService: LocalStorageService) {
		this.productList = this.localStorageService.getBooksInLocalStorage();
	}
	removeProductFromCollection(id: string) {
		console.log(id);
	}
}
