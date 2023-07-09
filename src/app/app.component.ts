import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { NotificationService } from './core/services/notificationService/notification.service';
import { MongoService } from './core/services/mongo/mongo.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(
		public themeServise: ThemeService,
		public notificationService: NotificationService,
		private mongoService: MongoService,
	) {}
	title = 'angular-final-task';

	ngOnInit(): void {
		this.mongoService.fetchData();
	}
}
