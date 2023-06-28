import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
	selector: 'app-page404',
	templateUrl: './page404.component.html',
	styleUrls: ['./page404.component.css'],
})
export class Page404Component implements OnInit, OnDestroy {
	counter = 10;
	private subscription!: Subscription;

	constructor(private router: Router, public themeServise: ThemeService) {}

	ngOnInit(): void {
		this.startCountdown();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	private startCountdown(): void {
		const interval = timer(0, 1000);
		this.subscription = interval.subscribe((sec) => {
			this.counter--;
			if (this.counter === 0) {
				this.subscription.unsubscribe();
				this.router.navigate(['/']);
			}
		});
	}
}
