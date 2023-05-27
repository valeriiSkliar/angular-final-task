import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService, Product } from 'src/app/services/local-storage.service';
import { ProductPageService } from 'src/app/services/product-page.service';

@Component({
	selector: 'app-product-component',
	templateUrl: './product-component.component.html',
	styleUrls: ['./product-component.component.css'],
})
export class ProductComponentComponent {
	id: string | undefined;
	collectionBooks = this.listProducts.getListProducts();
	productPage: Product | undefined;

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
