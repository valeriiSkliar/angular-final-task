import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { HttpClient } from '@angular/common/http';
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
		private http: HttpClient,
	) {}

	//commentService.sumComments - поле где лежит общая сумма коментов
	ngOnInit(): void {
		this.cartService.getCartItems();
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
}
