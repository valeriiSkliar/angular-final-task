import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/core/interfaces/iproduct';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProductPageService } from 'src/app/core/services/product-page.service';

@Component({
	selector: 'app-product-component',
	templateUrl: './product-component.component.html',
	styleUrls: ['./product-component.component.css'],
})
export class ProductComponentComponent {
	id: string | undefined;
	collectionBooks = this.listProducts.getBooksInLocalStorage();
	productPage: IProduct | undefined;

	newActiveProduct() {
		this.collectionBooks.forEach((element) => {
			if (element.id === this.id) {
				this.productPage = element;
				this.activePage.setProductPage(this.productPage);
			}
		});
	}

	constructor(
		private activeRoute: ActivatedRoute,
		private listProducts: LocalStorageService,
		private activePage: ProductPageService,
	) {
		this.id = this.activeRoute.snapshot.params['id'];
		this.newActiveProduct();
	}
}
