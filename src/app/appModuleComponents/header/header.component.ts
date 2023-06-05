import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	constructor(private cartService: CartService) {}

	ngOnInit() {
		this.cartService.getCartInLocalStorage();
	}
}
