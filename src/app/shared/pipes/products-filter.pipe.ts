import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';

@Pipe({
	name: 'productsFilter',
})
export class ProductsFilterPipe implements PipeTransform {
	transform(items: IProduct[], field = 'name', value: string): IProduct[] {
		console.log(field);
		if (!items) return [];
		if (!field || !value) return items;

		return items.filter((singleItem) => singleItem[field].toLowerCase().includes(value.toLowerCase()));
	}
}
