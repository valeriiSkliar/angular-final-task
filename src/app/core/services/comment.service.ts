import { Injectable } from '@angular/core';
import { IComments } from '../interfaces/comments';
import { extractComments, MongoService } from './mongo/mongo.service';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CommentService {
	private listComments: IComments[] = [
		// {
		// 	id: '',
		// 	comments: [],
		// },
	];
	public listComments$ = new BehaviorSubject<IComments[] | null>(null);
	constructor(private mongoService: MongoService) {
		this.mongoService.commentsCollection
			.pipe(
				filter(Boolean),
				map((value) => extractComments(value)),
			)
			.subscribe((commentsCollection) => {
				this.listComments = commentsCollection;
				this.listComments$.next(commentsCollection);
			});
		// if (!localStorage.getItem('ListComments')) {
		// 	localStorage.setItem('ListComments', JSON.stringify(this.listComments));
		// }
	}

	setListComments(comment: IComments) {
		this.mongoService.addComment(comment);
		// if (this.listComments.includes(comment)) {
		//   this.listComments.splice(this.listComments.indexOf(comment), 1, comment);
		// } else {
		//   this.listComments.push(comment);
		// }
		// localStorage.setItem('ListComments', JSON.stringify(this.listComments));
	}

	getListComments() {
		// console.log(this.listComments)
		// this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		return this.listComments$.value;
	}

	getBookComments(id: string) {
		let sum = 0;
		if (this.listComments$.value) {
			this.listComments$.value.forEach((book) => {
				if (book.id === id) {
					sum = book.comments.length;
				}
			});
		}
		return sum;
	}

	getTotalCommentsCount() {
		// this.listComments = JSON.parse(localStorage.getItem('ListComments')!);
		let sum = 0;
		console.log(this.listComments$.value);
		if (this.listComments$.value) {
			console.log(this.listComments$.value);
			this.listComments$.value.forEach((book) => {
				sum += book.comments.length;
			});
		}
		return sum;
	}

	getBooksSortedByComments(): string[] {
		const booksWithComments = [...this.listComments];

		booksWithComments.sort((a, b) => b.comments.length - a.comments.length);

		return booksWithComments.map((book) => book.id);
	}
}
