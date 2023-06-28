import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-back-component',
	templateUrl: './back-component.component.html',
	styleUrls: ['./back-component.component.css'],
})
export class BackComponentComponent {
	constructor(public themeServise: ThemeService) {}
}
