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
		if (this.listReting.includes(reting)) {
			this.listReting.splice(this.listReting.indexOf(reting), 1, reting);
		} else {
			this.listReting.push(reting);
		}
		localStorage.setItem('ListReting', JSON.stringify(this.listReting));
	}

	getListReting() {
		this.listReting = JSON.parse(localStorage.getItem('ListReting')!);
		return this.listReting;
	}
}
