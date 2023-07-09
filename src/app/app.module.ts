import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './appModuleComponents/footer/footer.component';
import { HeaderComponent } from './appModuleComponents/header/header.component';
import { CartModule } from './cart/cart.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { LocalStorageService } from './core/services/local-storage.service';
import { Page404Component } from './appModuleComponents/page404/page404.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ScrollButtonComponent } from './scroll-button/scroll-button.component';
import { MongoService } from './core/services/mongo/mongo.service';

export function initializeApp(mongoService: MongoService) {
	return (): Promise<any> => {
		return mongoService
			.fetchData()
			.toPromise()
			.then((data) => mongoService.setProductsCollection(data));
	};
}

@NgModule({
	declarations: [
		AppComponent,
		FooterComponent,
		HeaderComponent,
		HomeComponent,
		Page404Component,
		ScrollButtonComponent,
	],
	providers: [
		LocalStorageService,
		MongoService,
		{ provide: APP_INITIALIZER, useFactory: initializeApp, deps: [MongoService], multi: true },
	],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CartModule,
		SharedModule,
		ProductModule,
		AdminModule,
		FormsModule,
		SlickCarouselModule,
	],
})
export class AppModule {}
