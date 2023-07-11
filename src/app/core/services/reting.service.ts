import { Injectable } from '@angular/core';
import { IReting } from '../interfaces/ireting';

@Injectable({
	providedIn: 'root',
})
export class RetingService {
	listReting: IReting[] = [{ id: '', arrReting: [] }];

	constructor() {
		if (!localStorage.getItem('ListReting')) {
			localStorage.setItem('ListReting', JSON.stringify(this.listReting));
		}
	}

	setListReting(reting: IReting) {
		console.log(reting);
		console.log('setListReting');
		if (this.listReting.includes(reting)) {
			this.listReting.splice(this.listReting.indexOf(reting), 1, reting);
		} else {
			this.listReting.push(reting);
		}
		localStorage.setItem('ListReting', JSON.stringify(this.listReting));
	}

	getListReting() {
		console.log('getListReting');

		this.listReting = JSON.parse(localStorage.getItem('ListReting')!);
		return this.listReting;
	}

	getAverageRating() {
		console.log('getAverageRating');

		const reting = JSON.parse(localStorage.getItem('ListReting')!);
		let length = 0;
		let totalSum = 0;
		reting.forEach((reting: { id: ''; arrReting: [] }) => {
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
