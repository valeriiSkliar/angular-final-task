import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ScrollWithLoadingModule } from './derectives/scroll-with-loading/scroll-with-loading.module';
import { SlickCarouselComponent } from './components/slick-carousel/slick-carousel.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ModalComponent } from './components/modal/modal.component';
import { LicenseAgreementComponent } from './components/license-agreement/license-agreement.component';
import { PaginationDirective } from './derectives/pagination/pagination.directive';

@NgModule({
	declarations: [
		NotificationComponent,
		InputComponent,
		SlickCarouselComponent,
		ModalComponent,
		LicenseAgreementComponent,
		PaginationDirective,
	],
	imports: [CommonModule, FormsModule, ScrollWithLoadingModule, SlickCarouselModule],
	exports: [
		NotificationComponent,
		InputComponent,
		SlickCarouselComponent,
		ModalComponent,
		LicenseAgreementComponent,
		PaginationDirective,
	],
})
export class SharedModule {}
