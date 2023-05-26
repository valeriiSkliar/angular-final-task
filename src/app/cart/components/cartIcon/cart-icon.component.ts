import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

@Component({
	selector: 'app-cart-icon',
	templateUrl: './cart-icon.component.html',
	styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent {
	constructor(public cartService: CartService) {
		setInterval(() => {
			cartService.addCartProduct({
				id: this.randomId(),
				name: 'Product_1',
				description: 'This is the description for Product 1',
				price: 100.0,
				imageUrls: ['https://example.com/images/p1/1.jpg', 'https://example.com/images/p1/2.jpg'],
			});
		}, 5000);
	}
	randomId() {
		return String(Math.round(Math.random() * 1000));
	}
}
