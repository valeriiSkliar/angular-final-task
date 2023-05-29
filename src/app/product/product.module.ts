import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductComponent } from './product.component';
import { BackComponentComponent } from './back-component/back-component.component';
import { CommentComponentComponent } from './comment-component/comment-component.component';
import { ProductComponentComponent } from './product-component/product-component.component';
import { ProductImgComponent } from './product-component/product-img/product-img.component';
import { ProductInfoComponent } from './product-component/product-info/product-info.component';
import { ProductButtonComponent } from './product-component/product-info/product-button/product-button.component';
import { ProductDescriptionComponent } from './product-component/product-info/product-description/product-description.component';

@NgModule({
	declarations: [
		ProductComponent,
		BackComponentComponent,
		CommentComponentComponent,
		ProductComponentComponent,
		ProductImgComponent,
		ProductInfoComponent,
		ProductButtonComponent,
		ProductDescriptionComponent,
	],
	imports: [CommonModule, RouterLink, FormsModule],
	exports: [BackComponentComponent],
})
export class ProductModule {}
