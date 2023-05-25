import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './appModuleComponents/footer/footer.component';
import { HeaderComponent } from './appModuleComponents/header/header.component';
import { HomeComponent } from './home/home.component';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
	declarations: [AppComponent, FooterComponent, HeaderComponent, HomeComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
	providers: [LocalStorageService],
	bootstrap: [AppComponent],
})
export class AppModule {}
