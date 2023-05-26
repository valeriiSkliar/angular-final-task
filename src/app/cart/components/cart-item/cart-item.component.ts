import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../core/interfaces/iproduct';
import { IQuantityChangeData } from '../../../core/interfaces/iquantity-change-data';

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent {
	@Input()
	item!: { product: IProduct; quantity: number };
	@Output()
	quantityChange = new EventEmitter<IQuantityChangeData>();

	changeQuantity(change: number) {
		this.emitQuantityChange(this.item.quantity + change);
	}

	onQuantityChange(quantity: number | null) {
		if (!quantity) {
			quantity = 0;
		}

		this.emitQuantityChange(quantity);
	}

	private emitQuantityChange(quantity: number) {
		this.quantityChange.emit({
			id: this.item.product.id,
			quantity: quantity,
		});
	}
}
