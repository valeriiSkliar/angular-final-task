import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { IQuantityChangeData } from '../core/interfaces/iquantity-change-data';
import { CurrencyServiceService } from '../core/services/currency-service.service';
import { ThemeService } from '../core/services/theme.service';
import { IProduct } from '../core/interfaces/iproduct';
import { filter, map } from 'rxjs';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	cart!: { product: IProduct; quantity: number }[];
	cartHeight = 'calc(100% - 110px)';
	totalCost = 0;

	constructor(
		private cartService: CartService,
		public currencyService: CurrencyServiceService,
		public themeServise: ThemeService,
	) {}

	ngOnInit(): void {
		this.cartService.cartItems$
			.pipe(
				filter(Boolean),
				map((data) => {
					return data.items.map((item: { productId: string; quantity: number }) => {
						return {
							product: this.cartService.getIProductByID(item.productId),
							quantity: Number(item.quantity),
						};
					});
				}),
				filter(Boolean),
			)
			.subscribe((data) => {
				this.totalCost = data.reduce((acc: number, item: { product: IProduct; quantity: number }) => {
					if (item) {
						return acc + Number(item.product.price) * item.quantity;
					}
					return acc;
				}, 0);
				this.cart = data;
			});
	}
	ngDoCheck() {
		if (this.cartItems.length > 1) {
			this.cartHeight = '';
		} else {
			this.cartHeight = 'calc(100% - 110px)';
		}
		if (window.innerWidth < 576) {
			this.cartHeight = '';
		}
		if (window.innerWidth < 576 && this.cartItems.length === 0) {
			this.cartHeight = 'calc(100% - 110px)';
		}
	}

	get cartItems() {
		return this.cartService.getCartList();
	}

	updateQuantity(item: IQuantityChangeData) {
		this.cartService.updateProductInCart(item.product, item.quantity);
	}

	remove(itemId: string) {
		this.cartService.removeItemFromCart(itemId);
		this.cartService.removeItem(itemId);
	}
}
