import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-theme-button',
	templateUrl: './theme-button.component.html',
	styleUrls: ['./theme-button.component.css'],
})
export class ThemeButtonComponent {
	constructor(public themeServer: ThemeService) {}

	onClick() {
		this.themeServer.onTheme();
	}
}
