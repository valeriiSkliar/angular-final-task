import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { LOADING_DIRECTION } from '../../../shared/derectives/scroll-with-loading/scroll-with-loading.directive';

@Component({
	selector: 'app-product-list-management',
	templateUrl: './product-list-management.component.html',
	styleUrls: ['./product-list-management.component.css'],
})
export class ProductListManagementComponent {
	@Input() productList: IProduct[] | null = null;
	@Output() productIdToRemove = new EventEmitter<string>();
	@Output() productIdToEdit = new EventEmitter<string>();
	@Output() loadMoreData = new EventEmitter<string>();

	removeItemFromCollection(id: string) {
		this.productIdToRemove.emit(id);
	}

	editItemFromCollection(id: string) {
		this.productIdToEdit.emit(id);
	}

	loadData(direction: LOADING_DIRECTION | null) {
		if (direction) {
			this.loadMoreData.emit(String(direction));
		}
	}
}
