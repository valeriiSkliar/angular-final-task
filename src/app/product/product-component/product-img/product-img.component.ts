import { Component } from '@angular/core';
import { ProductPageService } from 'src/app/core/services/product-page.service';

@Component({
	selector: 'app-product-img',
	templateUrl: './product-img.component.html',
	styleUrls: ['./product-img.component.css'],
})
export class ProductImgComponent {
	imgUrl = this.activePage.getProductPage()?.imageUrls[0];
	constructor(private activePage: ProductPageService) {}
}
