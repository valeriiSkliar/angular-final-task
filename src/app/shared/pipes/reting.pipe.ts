import { Pipe, PipeTransform } from '@angular/core';
import { IReting } from 'src/app/core/interfaces/ireting';

@Pipe({
	name: 'reting',
})
export class RetingPipe implements PipeTransform {
	transform(numbers: number[]): number {
		if (!numbers || numbers.length === 0) {
			return 0;
		}

		const sum = numbers.reduce((acc, num) => acc + num, 0);
		return sum / numbers.length;
	}
}
