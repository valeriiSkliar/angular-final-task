import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { CommentService } from '../../../core/services/comment.service';
import { IProduct } from '../../../core/interfaces/iproduct';
import { ThemeService } from 'src/app/core/services/theme.service';
import { RetingService } from 'src/app/core/services/reting.service';
import { filter, map, tap } from 'rxjs';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
	totalBooks!: number;
	totalComments!: number;
	popularBooks!: Partial<IProduct>[];
	averageRating!: number;

	constructor(
		private localStorageService: LocalStorageService,
		private commentService: CommentService,
		public themeServise: ThemeService,
		private retingService: RetingService,
	) {}

	ngOnInit(): void {
		this.commentService.listComments$
			.pipe(
				filter(Boolean),
				tap((data) => {
					const sortedIds = data.sort((a, b) => b.comments.length - a.comments.length).map((book) => book.id);
					this.popularBooks = this.getPopularBooks(sortedIds).slice(0, 3);
				}),
				map((data) => {
					this.totalComments = data.reduce((acc, item) => {
						return (acc += item.comments.length);
					}, 0);
				}),
			)
			.subscribe();

		this.localStorageService.listProducts$.pipe(map((data) => data.length)).subscribe((data) => {
			return (this.totalBooks = data);
		});

		this.averageRating = this.retingService.getAverageRating();
	}
	getPopularBooks(bookIds: string[]): Partial<IProduct>[] {
		return this.localStorageService.getBooksByIds(bookIds);
	}
}
