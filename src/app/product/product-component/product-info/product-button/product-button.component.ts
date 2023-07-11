import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductPageService } from 'src/app/core/services/product-page.service';
import { ActivatedRoute } from '@angular/router';
import { IReting } from 'src/app/core/interfaces/ireting';
import { CommentService } from 'src/app/core/services/comment.service';
import { RetingService } from 'src/app/core/services/reting.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-product-button',
	templateUrl: './product-button.component.html',
	styleUrls: ['./product-button.component.css'],
})
export class ProductButtonComponent {
	quantity = 1;
	rating = 0;
	sumComment = 0;
	arrRating: IReting[] | undefined;
	activeRating: IReting = {
		id: '',
		arrReting: [],
	};

	constructor(
		public cartService: CartService,
		private activePage: ProductPageService,
		private activeRoute: ActivatedRoute,
		private commentService: CommentService,
		public themeService: ThemeService,
	) {}

	onClick() {
		this.cartService.addCartProduct(this.activePage.getProductPage(), Number(this.quantity));
	}

	getReting() {
		if (!this.activeRating.arrReting || this.activeRating.arrReting.length === 0) {
			this.rating = 0;
		} else {
			const sum = this.activeRating.arrReting.reduce((acc, num) => acc + num, 0);
			this.rating = Number((sum / this.activeRating.arrReting.length).toFixed(1));
		}
	}

	ngOnInit() {
		this.activeRating.id = this.activeRoute.snapshot.params['id'];
		this.sumComment = this.commentService.getBookComments(this.activeRating.id);
	}

	ngDoCheck() {
		this.sumComment = this.commentService.getBookComments(this.activeRating.id);
	}

	scrollBottom() {
		window.scrollTo({
			top: window.innerHeight + 5000,
		});
	}
}
