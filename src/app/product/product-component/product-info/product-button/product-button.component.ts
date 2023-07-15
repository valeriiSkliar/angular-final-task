import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductPageService } from 'src/app/core/services/product-page.service';
import { ActivatedRoute } from '@angular/router';
import { IReting } from 'src/app/core/interfaces/ireting';
import { CommentService } from 'src/app/core/services/comment.service';
import { RetingService } from 'src/app/core/services/reting.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { MongoService } from 'src/app/core/services/mongo.service';

@Component({
	selector: 'app-product-button',
	templateUrl: './product-button.component.html',
	styleUrls: ['./product-button.component.css'],
})
export class ProductButtonComponent {
	quantity = 1;
	reting = 0;
	sumComment = 0;
	arrReting: IReting[] | undefined;
	activeReting: IReting = {
		id: '',
		arrReting: [],
	};

	constructor(
		public cartService: CartService,
		private activePage: ProductPageService,
		private activeRoute: ActivatedRoute,
		private commentService: CommentService,
		private retingService: RetingService,
		public themeServise: ThemeService,
		private mongoService: MongoService,
	) {}

	onClick() {
		this.cartService.addCartProduct(this.activePage.getProductPage(), Number(this.quantity));
	}

	getReting() {
		if (!this.activeReting.arrReting || this.activeReting.arrReting.length === 0) {
			this.reting = 0;
		} else {
			const sum = this.activeReting.arrReting.reduce((acc, num) => acc + num, 0);
			this.reting = Number((sum / this.activeReting.arrReting.length).toFixed(1));
		}
	}

	ngOnInit() {
		this.activeReting.id = this.activeRoute.snapshot.params['id'];
		//this.arrReting = this.retingService.getListReting();
		this.arrReting = this.mongoService.listReting!;
		this.arrReting.forEach((element) => {
			if (element.id === this.activeReting.id) {
				this.activeReting = element;
			}
		});
		this.getReting();
		this.sumComment = this.commentService.getBookComments(this.activeReting.id);
	}

	ngDoCheck() {
		this.getReting();
		this.sumComment = this.commentService.getBookComments(this.activeReting.id);
	}

	setRating(num: number) {
		this.activeReting.arrReting.push(num);
		//this.retingService.setListReting(this.activeReting);
		this.mongoService.setRetingMongo(this.activeReting);
	}

	scrollBottom() {
		window.scrollTo({
			top: window.innerHeight + 5000,
		});
	}
}
