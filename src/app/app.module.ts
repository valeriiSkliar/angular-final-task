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
import { HttpClientModule } from '@angular/common/http';
import { MongoService } from './core/services/mongo.service';

// export function loadMongo(mongoService: MongoService) {
// 	return (): Promise<any> => {
// 		return mongoService.fetchData().then((data) => { mongoService.setData(data), console.log('kuku') })
// 	}
// }

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
		{
			provide: APP_INITIALIZER,
			useFactory: (mongoService: MongoService) => () =>
				mongoService.fetchDataBook().then((data) => {
					mongoService.setDataBook(data);
				}),
			deps: [MongoService],
			multi: true,
		},
		// (mongoService: MongoService) => () =>
		// 	mongoService.fetchDataComment().then((data) => {
		// 			mongoService.setDataComment(data);
		// 	})
		{
			provide: APP_INITIALIZER,
			useFactory: (mongoService: MongoService) => () =>
				mongoService.fetchDataComment().then((data) => {
					mongoService.setDataComment(data);
				}),
			deps: [MongoService],
			multi: true,
		},
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
		HttpClientModule,
	],
})
export class AppModule {}
