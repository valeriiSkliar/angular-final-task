import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'currencyChange',
})
export class CurrencyChangePipe implements PipeTransform {
	transform(value: number, currencyValue: string): string {
		switch (currencyValue) {
			case '₴': {
				return '₴' + Number(value).toFixed(2);
			}
			case '$': {
				value = parseFloat((value / 32).toFixed(2));
				return '$' + value;
			}
			case '€': {
				value = parseFloat((value / 40).toFixed(2));
				return '€' + value;
			}
			default: {
				return '₴' + value;
			}
		}
	}
}
