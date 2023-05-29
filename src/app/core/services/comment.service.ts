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
		localStorage.setItem('ListComments', JSON.stringify(this.listComments));
	}

	getListComments() {
		this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		return this.listComments;
	}
}
