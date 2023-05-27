import { Component } from '@angular/core';
import { ProductPageService } from 'src/app/services/product-page.service';

@Component({
	selector: 'app-product-description',
	templateUrl: './product-description.component.html',
	styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent {
	name = this.activePage.getProductPage()?.name;
	price = this.activePage.getProductPage()?.price;
	bookDescription = this.activePage.getProductPage()?.description;
	constructor(private activePage: ProductPageService) {}
}
