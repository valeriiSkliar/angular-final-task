import { Component } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';
import { ActionAndId } from './components/product-list-management/product-list-management.component';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
	productList: IProduct[] = [];
	productToAddEdit: IProduct = { name: '', id: '', url: '', price: 0, description: '', imageUrls: [] };
	isFormOpen = false;

	constructor(private localStorageService: LocalStorageService) {
		this.refreshProductList();
	}

	removeProductFromCollection(id: string) {
		this.localStorageService.removeBook(id);
		this.refreshProductList();
	}

	submitForm(product: IProduct) {
		this.localStorageService.setBooksInLocalStorage(product);
		this.isFormOpen = false;
		this.refreshProductList();
	}

	editProductFromCollection(id: string) {
		const products: IProduct[] = this.localStorageService.getBooksInLocalStorage();
		const product = products.find((product) => product.id === id);
		if (product) {
			this.productToAddEdit = product;
			this.isFormOpen = true;
		} else {
			// handle error
		}
	}

	lazyLoadingList(direction: string) {
		console.log(direction);
	}

	private refreshProductList() {
		this.productList = this.localStorageService.getBooksInLocalStorage();
	}

	toggleFormModal(event: ActionAndId = { action: 'add', id: '' }) {
		if (event.action === 'edit') {
			this.isFormOpen = !this.isFormOpen;
			this.editProductFromCollection(event.id);
			return;
		}
		if (event.action === 'remove') {
			this.removeProductFromCollection(event.id);
			return;
		}
		this.isFormOpen = !this.isFormOpen;
		this.productToAddEdit = { name: '', id: '', url: '', price: 0, description: '', imageUrls: [] };
	}
}
