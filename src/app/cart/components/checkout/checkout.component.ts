import { AfterViewInit, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../core/services/cart.service';
import { IOrder } from '../../../core/interfaces/iorder';
import { ICartItems } from '../../../core/interfaces/icart-items';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/services/notificationService/notification.service';

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
	@ViewChild('forNotificationMessage')
	forNotificationMessage: TemplateRef<any> | null = null;

	@Output() clearCart = new EventEmitter();
	checkoutForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private httpClient: HttpClient,
		private cartService: CartService,
		public notificationService: NotificationService,
	) {}

	// openPopup(template: TemplateRef<{$implicit: string}>, message: string) {
	showNotification(template: TemplateRef<any> | null, context: { message: string | null; type: string }) {
		this.notificationService.showNotification({
			template,
			context: { $implicit: context },
		});
	}

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
							this.showNotification(this.forNotificationMessage, { message: message, type: 'success' });
						}
					},
					(error) => {
						console.error(error);
						this.showNotification(this.forNotificationMessage, { message: error.statusText, type: 'error' });
						setTimeout(() => {
							this.showNotification(this.forNotificationMessage, { message: null, type: 'info' });
						}, 4000);
					},
					() => {
						setTimeout(() => {
							this.showNotification(this.forNotificationMessage, { message: null, type: 'info' });
						}, 4000);
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
		const order = this.extractItemFromCart(this.cartService.cartItems);
		if (order.length) {
			this.sendRequestToServer(order);
		}
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
