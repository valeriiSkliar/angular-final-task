import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './components/notification/notification.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { ScrollWithLoadingModule } from './derectives/scroll-with-loading/scroll-with-loading.module';

@NgModule({
	declarations: [NotificationComponent, InputComponent],
	imports: [CommonModule, FormsModule, ScrollWithLoadingModule],
	exports: [NotificationComponent, InputComponent],
})
export class SharedModule {}
