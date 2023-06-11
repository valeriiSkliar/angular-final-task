import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';

@Pipe({
	name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
	transform(value: IProduct[] | null, arg = 'name'): IProduct[] | null {
		if (value) {
			return value.sort((a, b) => {
				return a.name.localeCompare(b.name, ['ru', 'en'], { sensitivity: 'base' });
			});
		}
		return value;
	}
}
