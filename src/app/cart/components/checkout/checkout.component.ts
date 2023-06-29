import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { ICartItems } from '../../../core/interfaces/icart-items';
import { FormBuilder, FormGroup, MinLengthValidator } from '@angular/forms';

type bodyRequest = {
	contactInfo: string[];
	cartItems: IOrder[];
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
		console.log(this.checkoutForm.value);
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
