import { Injectable } from '@angular/core';
import { IReting } from '../interfaces/ireting';
import { MongoService } from './mongo.service';

@Injectable({
	providedIn: 'root',
})
export class RetingService {
	listReting: IReting[] = [{ id: '', arrReting: [] }];

	constructor(private mongoService: MongoService) {}

	getAverageRating() {
		const reting = this.mongoService.listReting!;
		let length = 0;
		let totalSum = 0;
		reting.forEach((reting: IReting) => {
			length += reting.arrReting.length;
		});
		for (let i = 0; i < reting.length; i++) {
			for (let j = 0; j < reting[i].arrReting.length; j++) {
				totalSum += reting[i].arrReting[j];
			}
		}
		return Number((totalSum / length).toFixed(1));
	}
}
