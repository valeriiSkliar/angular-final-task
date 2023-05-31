import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductPageService } from 'src/app/core/services/product-page.service';

@Component({
	selector: 'app-product-button',
	templateUrl: './product-button.component.html',
	styleUrls: ['./product-button.component.css'],
})
export class ProductButtonComponent {
	quantity = 1;

	constructor(public cartService: CartService, private activePage: ProductPageService) {}

	onClick() {
		console.log(this.quantity);
		this.cartService.addCartProduct(this.activePage.getProductPage(), this.quantity);
	}
}
