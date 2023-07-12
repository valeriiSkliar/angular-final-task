import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IProduct } from '../../../core/interfaces/iproduct';
import { IQuantityChangeData } from '../../../core/interfaces/iquantity-change-data';
import { CurrencyServiceService } from '../../../core/services/currency-service.service';
import { CartService } from '../../../core/services/cart.service';

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
	@Output()
	removeItem = new EventEmitter<string>();

	private quantityChangeSubject = new Subject<number>();

	constructor(public currencyService: CurrencyServiceService) {
		this.quantityChangeSubject.pipe(debounceTime(500)).subscribe((quantity) => {
			this.quantityChange.emit({
				product: this.item.product.id,
				quantity: quantity,
			});
		});
	}

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
		this.quantityChangeSubject.next(quantity);
	}

	remove(id: string) {
		this.removeItem.emit(id);
	}
}
