import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { debounceTime, map } from 'rxjs';

@Component({
	selector: 'app-cart-icon',
	templateUrl: './cart-icon.component.html',
	styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent implements OnInit {
	notificationMessage: string | null = null;

	notificationType: 'success' | 'error' | 'info' | null = null;

	totalQuantity = 0;
	constructor(public cartService: CartService, public themeServise: ThemeService) {}

	dismissNotification() {
		this.notificationMessage = null;
		this.notificationType = null;
	}

	ngOnInit(): void {
		this.cartService.cartItems$
			.pipe(
				map((data) => data),
				debounceTime(500),
			)
			.subscribe((data) => {
				if (data) {
					this.totalQuantity = data.items.reduce((acc: number, item: { quantity: number }) => {
						if (item) {
							return acc + Number(item.quantity);
						}
						return acc;
					}, 0);
				}
			});
	}
}
