import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-page404',
	templateUrl: './page404.component.html',
	styleUrls: ['./page404.component.css'],
})
export class Page404Component implements OnInit, OnDestroy {
	counter = 10;
	private subscription!: Subscription;

	constructor(private router: Router) {}

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
