import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { ICartItems } from '../../../core/interfaces/icart-items';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements AfterViewInit {
	message: string | undefined;
	constructor(private httpClient: HttpClient, private cartService: CartService) {}

	extractItemFromCart(cartItems: ICartItems): IOrder[] {
		return Object.entries(cartItems).map(([key, { product, quantity }]) => {
			return { name: product.name, quantity: quantity, id: key };
		});
	}

	sendGods(order: IOrder[]) {
		console.log(order);
		const chatId = localStorage.getItem('chatId');

		if (chatId) {
			this.httpClient.post('http://localhost:3000/cart/checkout', { chatId: chatId, order: order }).subscribe(
				(response: any) => {
					const { message, responseHTML } = response;
					if (message) {
						this.message = responseHTML;
					}
					console.log(response);
				},
				(error) => {
					console.error(error);
				},
			);
		}
	}

	scrollPageUp() {
		window.scrollTo({
			top: 1900,
		});
	}

	ngAfterViewInit(): void {
		this.scrollPageUp();
	}

	sendOrder() {
		this.sendGods(this.extractItemFromCart(this.cartService.cartItems));
	}
}
