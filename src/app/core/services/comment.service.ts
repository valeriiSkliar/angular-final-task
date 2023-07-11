import { Injectable } from '@angular/core';
import { IComments } from '../interfaces/comments';
import { MongoService } from './mongo.service';

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

	constructor(private mongoService: MongoService) {
		if (!localStorage.getItem('ListComments')) {
			localStorage.setItem('ListComments', JSON.stringify(this.listComments));
		}
	}

	setListComments(comment: IComments) {
		this.mongoService.setCommentMongo(comment);
		// if (this.listComments.includes(comment)) {
		// 	this.listComments.splice(this.listComments.indexOf(comment), 1, comment);
		// } else {
		// 	this.listComments.push(comment);
		// }
		// localStorage.setItem('ListComments', JSON.stringify(this.listComments));
	}

	getListComments() {
		this.listComments = this.mongoService.listComments!;
		//this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
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
		this.listComments = this.mongoService.listComments!;
		//this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
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
