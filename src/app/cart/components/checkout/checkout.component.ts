import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { ICartItems } from '../../../core/interfaces/icart-items';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
	@Output() clearCart = new EventEmitter();
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
						const { message } = response;
						if (message) {
							this.message = message;
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
		this.cartService.clearCart();
	}

	ngOnInit(): void {
		this.setFormDefaultState();
	}

	setFormDefaultState() {
		this.checkoutForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
		});
	}
}
