import { Component } from '@angular/core';
import { ProductPageService } from 'src/app/core/services/product-page.service';
import { CurrencyServiceService } from '../../../../core/services/currency-service.service';

@Component({
	selector: 'app-product-description',
	templateUrl: './product-description.component.html',
	styleUrls: ['./product-description.component.css'],
})
export class ProductDescriptionComponent {
	name = this.activePage.getProductPage()?.name;
	price = Number(this.activePage.getProductPage()?.price);
	bookDescription = this.activePage.getProductPage()?.description;
	constructor(private activePage: ProductPageService, public currencyService: CurrencyServiceService) {}
}
