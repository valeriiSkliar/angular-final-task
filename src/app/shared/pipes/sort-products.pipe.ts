import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';

@Pipe({
	name: 'sortProducts',
})
export class SortProductsPipe implements PipeTransform {
	transform(value: IProduct[] | null, arg = 'name'): IProduct[] {
		return value!.sort((a, b) => {
			return a.name.localeCompare(b.name, ['ru', 'en'], { sensitivity: 'base' });
		});
	}
}
