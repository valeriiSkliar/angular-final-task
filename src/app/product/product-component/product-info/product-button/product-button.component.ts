import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
	selector: 'app-product-button',
	templateUrl: './product-button.component.html',
	styleUrls: ['./product-button.component.css'],
})
export class ProductButtonComponent {
	constructor(public cartService: CartService) {}

	onClick() {
		this.cartService.addCartProduct({
			id: this.randomId(),
			name: 'Product_1',
			description: 'This is the description for Product 1',
			price: 100.0,
			imageUrls: ['https://example.com/images/p1/1.jpg', 'https://example.com/images/p1/2.jpg'],
		});
	}

	randomId() {
		return String(Math.round(Math.random() * 1000));
	}
}
