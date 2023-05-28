import { NgModule } from '@angular/core';
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

@NgModule({
	declarations: [AppComponent, FooterComponent, HeaderComponent, HomeComponent],
	providers: [LocalStorageService],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		CartModule,
		SharedModule,
		ProductModule,
		AdminModule,
	],
})
export class AppModule {}
