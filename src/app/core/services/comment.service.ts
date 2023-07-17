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
		// if (!localStorage.getItem('ListComments')) {
		// 	localStorage.setItem('ListComments', JSON.stringify(this.listComments));
		// }
		this.listComments = this.mongoService.listComments!;
	}

	setListComments(comment: IComments) {
		this.mongoService.setCommentMongo(comment);
	}

	getListComments() {
		this.listComments = this.mongoService.listComments!;
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
