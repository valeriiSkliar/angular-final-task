import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'comments',
})
export class CommentsPipe implements PipeTransform {
	transform(value: string): string {
		return value
			.replaceAll('кокос', '*****')
			.replaceAll('@', '*')
			.replaceAll('банан', '*****')
			.replaceAll('плохой', '******');
	}
}
