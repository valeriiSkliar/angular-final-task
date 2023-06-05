import { Component } from '@angular/core';
import { ProductPageService } from 'src/app/core/services/product-page.service';

@Component({
	selector: 'app-product-img',
	templateUrl: './product-img.component.html',
	styleUrls: ['./product-img.component.css'],
})
export class ProductImgComponent {
	images = this.activePage.getProductPage()?.imageUrls;
	imgUrl: { img: string }[] = transformImageData(this.images);
	constructor(private activePage: ProductPageService) {}
}

export function transformImageData(array: string[]) {
	return array.map((item) => {
		return { img: item };
	});
}
