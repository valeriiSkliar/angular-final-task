import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from 'src/app/core/services/theme.service';
import { CurrencyServiceService } from 'src/app/core/services/currency-service.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	constructor(
		private cartService: CartService,
		public commentService: CommentService,
		public themeServise: ThemeService,
		public currencyService: CurrencyServiceService,
	) {}

	//commentService.sumComments - поле где лежит общая сумма коментов
	ngOnInit(): void {
		this.cartService.getCartItems();
		this.currencyService.selectedCurrency$.subscribe((currency: string) => {
			this.currencyService.setSelectedCurrency(currency);
		});
	}

	requestToServer() {
		console.log('check');
		// this.http.get('http://localhost:3000/admin').subscribe(
		//   (response: any) => {
		//     console.log(response);
		//   },
		//   (error) => {
		//     console.error(error);
		//   },
		// );
	}

	changeCurrency(currency: string) {
		this.currencyService.selectedCurrency$.next(currency);
	}
}
