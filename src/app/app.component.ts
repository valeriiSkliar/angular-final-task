import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { NotificationService } from './core/services/notificationService/notification.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(public themeServise: ThemeService, public notificationService: NotificationService) {}
	title = 'angular-final-task';
}
