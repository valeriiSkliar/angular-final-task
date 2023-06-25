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

	constructor() {
		if (!localStorage.getItem('ListComments')) {
			localStorage.setItem('ListComments', JSON.stringify(this.listComments));
		}
	}

	setListComments(comment: IComments) {
		if (this.listComments.includes(comment)) {
			this.listComments.splice(this.listComments.indexOf(comment), 1, comment);
		} else {
			this.listComments.push(comment);
		}
		localStorage.setItem('ListComments', JSON.stringify(this.listComments));
	}

	getListComments() {
		this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		return this.listComments;
	}

	getBookComments(id: string) {
		let sum = 0;
		this.listComments.forEach((book) => {
			if (book.id === id) {
				sum = book.comments.length;
			}
		});
		return sum;
	}

	getTotalCommentsCount() {
		let sum = 0;
		this.listComments.forEach((book) => {
			sum += book.comments.length;
		});
		return sum;
	}
	getBooksSortedByComments(): string[] {
		const booksWithComments = [...this.listComments];

		booksWithComments.sort((a, b) => b.comments.length - a.comments.length);

		return booksWithComments.map((book) => book.id);
	}
}
