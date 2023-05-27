import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './appModuleComponents/footer/footer.component';
import { HeaderComponent } from './appModuleComponents/header/header.component';
import { CartModule } from './cart/cart.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent, FooterComponent, HeaderComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, CartModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
