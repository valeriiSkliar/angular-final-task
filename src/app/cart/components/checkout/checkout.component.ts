import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { ICartItems } from '../../../core/interfaces/icart-items';
import { FormBuilder, FormGroup } from '@angular/forms';

type contactInfo = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
};

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements AfterViewInit, OnInit {
	message: string | undefined;
	checkoutForm!: FormGroup;
	constructor(private fb: FormBuilder, private httpClient: HttpClient, private cartService: CartService) {}

	extractItemFromCart(cartItems: ICartItems): IOrder[] {
		return Object.entries(cartItems).map(([key, { product, quantity }]) => {
			return { name: product.name, quantity: quantity, id: key };
		});
	}

	sendRequestToServer(order: IOrder[]) {
		const chatId = localStorage.getItem('chatId');
		const contactInfo: contactInfo = this.checkoutForm.value;
		if (chatId) {
			this.httpClient
				.post('http://localhost:3000/cart/checkout', {
					chatId: chatId,
					order: order,
					contactInfo: contactInfo,
				})
				.subscribe(
					(response: any) => {
						const { message, responseHTML } = response;
						if (message) {
							this.message = responseHTML;
						}
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
		this.sendRequestToServer(this.extractItemFromCart(this.cartService.cartItems));
	}

	ngOnInit(): void {
		this.setFormDefaultState();
	}

	setFormDefaultState() {
		this.checkoutForm = this.fb.group({
			firstName: [''],
			lastName: [''],
			phoneNumber: [''],
		});
	}
}
