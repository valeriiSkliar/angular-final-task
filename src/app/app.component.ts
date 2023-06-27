import { Component } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(public themeServise: ThemeService) {
		console.log(navigator);
	}
	title = 'angular-final-task';
}
