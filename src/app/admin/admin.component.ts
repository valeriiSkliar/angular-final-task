import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../core/services/local-storage.service';
import { IProduct } from '../core/interfaces/iproduct';
import { ActionAndId } from './components/product-list-management/product-list-management.component';
import { WebSocketSubject } from 'rxjs/webSocket';
import { ThemeService } from '../core/services/theme.service';

type chatId = { chatId: string };

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
	productList: IProduct[] = [];
	productToAddEdit: IProduct = { name: '', id: '', url: '', price: 0, description: '', imageUrls: [] };
	isFormOpen = false;

	constructor(private localStorageService: LocalStorageService, public themeServise: ThemeService) {
		// this.refreshProductList();
	}

	removeProductFromCollection(id: string) {
		this.localStorageService.removeBook(id);
		// this.refreshProductList();
	}

	submitForm(product: IProduct) {
		this.localStorageService.setBooksInLocalStorage(product);
		this.isFormOpen = false;
		// this.refreshProductList();
	}

	editProductFromCollection(id: string) {
		const product = this.productList.find((product) => product.id === id);
		if (product) {
			this.productToAddEdit = product;
			this.isFormOpen = true;
		} else {
			// handle error
		}
	}

	lazyLoadingList(direction: string) {
		// console.log(direction);
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

	openBot() {
		const socketUrl = 'ws://localhost:8080';
		const socket = new WebSocketSubject<chatId>(socketUrl);
		socket.subscribe(
			(message) => {
				if ('chatId' in message) {
					localStorage.setItem('chatId', message.chatId);
				}
			},
			(error) => {
				console.error('Ошибка соединения:', error);
			},
			() => {
				console.log('Соединение закрыто');
			},
		);
		const url = 'https://t.me/Personal_expense_tracker_bot';
		window.open(url, '_blank');
	}

	ngOnInit(): void {
		this.localStorageService.listProducts$.subscribe((nextValue) => {
			this.productList = nextValue;
		});
	}
}
