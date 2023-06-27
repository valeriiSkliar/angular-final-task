import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CurrencyServiceService implements OnDestroy {
	selectedCurrency = '';
	selectedCurrency$ = new BehaviorSubject('₴');

	setSelectedCurrency(currency: string): void {
		this.selectedCurrency = currency;
	}

	getSelectedCurrency(): string {
		return this.selectedCurrency;
	}

	ngOnDestroy(): void {
		this.selectedCurrency$.unsubscribe();
	}
}
