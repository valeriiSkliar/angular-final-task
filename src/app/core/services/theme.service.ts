import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	stateTheme = {
		themeBlack: false,
		themeWhite: true,
	};

	onTheme() {
		if (this.stateTheme.themeBlack) {
			this.stateTheme.themeBlack = false;
			this.stateTheme.themeWhite = true;
		} else {
			this.stateTheme.themeBlack = true;
			this.stateTheme.themeWhite = false;
		}
		localStorage.setItem('StateTheme', JSON.stringify(this.stateTheme));
	}

	constructor() {
		if (!localStorage.getItem('StateTheme')) {
			if (window.matchMedia('(prefers-color-scheme: light)').matches) {
				localStorage.setItem('StateTheme', JSON.stringify(this.stateTheme));
			} else {
				this.stateTheme.themeBlack = true;
				this.stateTheme.themeWhite = false;
				localStorage.setItem('StateTheme', JSON.stringify(this.stateTheme));
			}
		} else {
			this.stateTheme = JSON.parse(localStorage.getItem('StateTheme')!);
		}
	}
}
