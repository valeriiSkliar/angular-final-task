import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ScrollWithLoadingModule } from './derectives/scroll-with-loading/scroll-with-loading.module';
import { SlickCarouselComponent } from './components/slick-carousel/slick-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
	declarations: [NotificationComponent, InputComponent, SlickCarouselComponent],
	imports: [CommonModule, FormsModule, ScrollWithLoadingModule, SlickCarouselModule],
	exports: [NotificationComponent, InputComponent, SlickCarouselComponent],
})
export class SharedModule {}
