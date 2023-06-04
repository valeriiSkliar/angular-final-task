import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'correctComment',
})
export class CorrectCommentPipe implements PipeTransform {
	transform(value: string): string {
		return value
			.replaceAll('кокос', '*****')
			.replaceAll('@', '*')
			.replaceAll('банан', '*****')
			.replaceAll('плохой', '******');
	}
}
