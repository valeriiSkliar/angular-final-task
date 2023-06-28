import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-cart-icon',
	templateUrl: './cart-icon.component.html',
	styleUrls: ['./cart-icon.component.css'],
})
export class CartIconComponent {
	notificationMessage: string | null = null;

	notificationType: 'success' | 'error' | 'info' | null = null;

	constructor(public cartService: CartService, public themeServise: ThemeService) {}

	dismissNotification() {
		this.notificationMessage = null;
		this.notificationType = null;
	}
}
