import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
	selector: 'app-cart-icon',
	templateUrl: './cart-icon.component.html',
	styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent {
	notificationMessage: string | null = null;

	notificationType: 'success' | 'error' | 'info' | null = null;

	constructor(public cartService: CartService) {
		// need to delete this testing code
		/*setInterval(() => {
			cartService.addCartProduct({
				id: this.randomId(),
				name: 'Product_1',
				description: 'This is the description for Product 1',
				price: 100.0,
				imageUrls: ['https://example.com/images/p1/1.jpg', 'https://example.com/images/p1/2.jpg'],
			});
			this.notificationMessage = 'Product added to cart successfully!';
			this.notificationType = 'success';
		}, 5000);*/
	}
	randomId() {
		return String(Math.round(Math.random() * 1000));
	}

	dismissNotification() {
		this.notificationMessage = null;
		this.notificationType = null;
	}
}
