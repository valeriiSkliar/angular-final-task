import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './appModuleComponents/footer/footer.component';
import { HeaderComponent } from './appModuleComponents/header/header.component';
import { HomeComponent } from './home/home.component';
import { LocalStorageService } from './services/local-storage.service';
import { ProductComponent } from './product/product.component';
import { ProductComponentComponent } from './product/product-component/product-component.component';
import { ProductImgComponent } from './product/product-component/product-img/product-img.component';
import { ProductInfoComponent } from './product/product-component/product-info/product-info.component';
import { ProductButtonComponent } from './product/product-component/product-info/product-button/product-button.component';
import { ProductDescriptionComponent } from './product/product-component/product-info/product-description/product-description.component';
import { CommentComponentComponent } from './product/comment-component/comment-component.component';
import { BackComponentComponent } from './product/back-component/back-component.component';

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		ProductComponent,
		ProductComponentComponent,
		ProductImgComponent,
		ProductInfoComponent,
		ProductButtonComponent,
		ProductDescriptionComponent,
		CommentComponentComponent,
		BackComponentComponent,
	],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
	providers: [LocalStorageService],
	bootstrap: [AppComponent],
})
export class AppModule {}
