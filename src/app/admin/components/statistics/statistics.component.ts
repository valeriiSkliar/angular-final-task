import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CommentService } from '../../../core/services/comment.service';
import { IProduct } from '../../../core/interfaces/iproduct';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
	totalBooks!: number;
	totalComments!: number;
	booksByCategories!: number;
	popularBooks!: IProduct[];
	averageRating!: number;

	constructor(private localStorageService: LocalStorageService, private commentService: CommentService) {}

	ngOnInit(): void {
		this.totalBooks = this.localStorageService.getTotalBooksCount();
		this.totalComments = this.commentService.getTotalCommentsCount();
		this.popularBooks = this.getPopularBooks();
		this.booksByCategories = 5; // Замените это на реальные данные
		this.averageRating = 4.5; // Замените это на реальные данные
	}
	getPopularBooks(): IProduct[] {
		const bookIds = this.commentService.getBooksSortedByComments();
		const popularBooks = this.localStorageService.getBooksByIds(bookIds);
		if (popularBooks.length > 3) {
			popularBooks.length = 3;
		}
		return popularBooks;
	}
}
