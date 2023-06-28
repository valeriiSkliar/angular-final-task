import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { LOADING_DIRECTION } from '../../../shared/derectives/scroll-with-loading/scroll-with-loading.directive';
import { ThemeService } from 'src/app/core/services/theme.service';

export interface ActionAndId {
	action: EventTarget | string;
	id: string;
}

@Component({
	selector: 'app-product-list-management',
	templateUrl: './product-list-management.component.html',
	styleUrls: ['./product-list-management.component.css'],
})
export class ProductListManagementComponent {
	@Input() productList: IProduct[] | null = null;
	@Output() productIdToRemove = new EventEmitter<string>();
	@Output() productIdToEdit = new EventEmitter<string>();
	@Output() idAndActionName = new EventEmitter<ActionAndId>();
	@Output() loadMoreData = new EventEmitter<string>();

	constructor(public themeServise: ThemeService) {}

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

	emitIdAndActionName(param: { action: Event; id: string }) {
		const element = param.action.target;
		const actionName = (element as HTMLButtonElement).name;
		this.idAndActionName.emit({ action: actionName, id: param.id });
	}
}
