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

	sumComments: number | undefined;

	constructor() {
		if (!localStorage.getItem('ListComments')) {
			localStorage.setItem('ListComments', JSON.stringify(this.listComments));
			console.log(this.listComments);
		}
		this.getNumberComments();
	}

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

	getNumberComments() {
		this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		let sum = 0;
		this.listComments.forEach((book) => {
			sum += book.comments.length;
		});
		this.sumComments = sum;
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
