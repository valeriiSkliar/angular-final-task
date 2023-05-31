import { Injectable } from '@angular/core';
import { IComments } from '../interfaces/comments';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	private listComments: IComments[] = [
		{
			id: '',
			comments: [],
		},
	];

	setListComments(comment: IComments) {
		this.listComments.push(comment);
		this.listComments.forEach((element) => {
			if (element.id === comment.id) {
				this.listComments.splice(this.listComments.indexOf(element), 2, comment);
			}
		});
		localStorage.setItem('ListComments', JSON.stringify(this.listComments));
	}

	getListComments() {
		this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		return this.listComments;
	}

	constructor() {
		if (!localStorage.getItem('ListComments')) {
			localStorage.setItem('ListComments', JSON.stringify(this.listComments));
		}
	}
}
