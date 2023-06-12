import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
	totalBooks!: number;
	totalComments!: number;
	booksByCategories!: number;
	popularBooks!: string[];
	averageRating!: number;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	ngOnInit(): void {
		// Здесь вы можете инициализировать свои данные, например, отправив запрос на сервер
		this.totalBooks = 100; // Замените это на реальные данные
		this.totalComments = 200; // Замените это на реальные данные
		this.booksByCategories = 5; // Замените это на реальные данные
		this.popularBooks = ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5']; // Замените это на реальные данные
		this.averageRating = 4.5; // Замените это на реальные данные
	}
}
