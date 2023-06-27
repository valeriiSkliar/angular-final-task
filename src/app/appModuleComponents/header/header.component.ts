import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { ThemeService } from 'src/app/core/services/theme.service';

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
	) {}
	//commentService.sumComments - поле где лежит общая сумма коментов
	ngOnInit(): void {
		this.cartService.getCartItems();
	}
}
