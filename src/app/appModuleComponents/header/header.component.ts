import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
	constructor(private http: HttpClient, private cartService: CartService, public commentService: CommentService) {}
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
