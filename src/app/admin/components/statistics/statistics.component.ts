import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CommentService } from '../../../core/services/comment.service';
import { IProduct } from '../../../core/interfaces/iproduct';
import { ThemeService } from 'src/app/core/services/theme.service';
import { RetingService } from 'src/app/core/services/reting.service';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
	totalBooks!: number;
	totalComments!: number;
	booksByCategories!: number;
	popularBooks!: Partial<IProduct>[];
	averageRating!: number;

	constructor(
		private localStorageService: LocalStorageService,
		private commentService: CommentService,
		public themeServise: ThemeService,
		private retingService: RetingService,
	) {}

	ngOnInit(): void {
		this.commentService.getTotalCommentsCount();
		this.totalBooks = this.localStorageService.getTotalBooksCount();
		this.totalComments = this.commentService.getTotalCommentsCount();
		this.popularBooks = this.getPopularBooks();
		this.booksByCategories = 5; // Замените это на реальные данные
		this.averageRating = this.retingService.getAverageRating();
	}
	getPopularBooks(): Partial<IProduct>[] {
		const bookIds = this.commentService.getBooksSortedByComments();
		const popularBooks = this.localStorageService.getBooksByIds(bookIds);
		if (popularBooks.length > 3) {
			popularBooks.length = 3;
		}
		if (!popularBooks.length) {
			return [{ name: '--' }];
		}
		return popularBooks;
	}
}
