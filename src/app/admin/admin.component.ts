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
	productToEdit: IProduct = { name: '', id: '', price: 0, description: '', imageUrls: [] };

	constructor(private localStorageService: LocalStorageService) {
		this.productList = this.localStorageService.getBooksInLocalStorage();
	}
	removeProductFromCollection(id: string) {
		this.localStorageService.removeBook(id);
	}

	submitForm(product: IProduct) {
		this.localStorageService.setBooksInLocalStorage(product);
	}

	editProductFromCollection(id: string) {
		console.log(id);
		const products: IProduct[] = this.localStorageService.getBooksInLocalStorage();
		const product = products.find((product) => {
			return product.id === id;
		});
		if (product) {
			this.productToEdit = product;
		}
	}

	lazyLoadingList(direction: string) {
		console.log(direction);
	}
}
