import { Component } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { IQuantityChangeData } from '../core/interfaces/iquantity-change-data';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent {
	// totalCost = 0;

	constructor(private cartService: CartService) {}

	get cartItems() {
		return this.cartService.getCartList();
	}

	get totalCost() {
		return this.cartService.getCartList().reduce((accum, { product, quantity }) => {
			return accum + product.price * quantity;
		}, 0);
	}

	updateQuantity(item: IQuantityChangeData) {
		if (item.quantity >= 0) {
			this.cartService.updateQuantity(item.id, item.quantity);
		}
	}

	remove(itemId: string) {
		this.cartService.removeItem(itemId);
	}

	buyGoogs() {
		this.cartService.clearCart();
	}
}
