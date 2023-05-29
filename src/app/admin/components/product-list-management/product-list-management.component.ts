import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';

@Component({
	selector: 'app-product-list-management',
	templateUrl: './product-list-management.component.html',
	styleUrls: ['./product-list-management.component.css'],
})
export class ProductListManagementComponent {
	@Input() productList: IProduct[] | null = null;
	@Output() productIdToRemove = new EventEmitter<string>();

	removeItemFromCollection(id: string) {
		this.productIdToRemove.emit(id);
	}
}
