import { Component, Input, OnInit } from '@angular/core';
import { RetingService } from '../../../core/services/reting.service';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-star-rating',
	templateUrl: './star-rating.component.html',
	styleUrls: ['./star-rating.component.css'],
})
export class StarRatingComponent implements OnInit {
	@Input() productId = '';
	rating?: number;
	userRating = 0;
	isLoading = false;
	ratingUpdate = new Subject<number>();

	constructor(private ratingService: RetingService) {
		this.ratingUpdate
			.pipe(
				tap(() => (this.isLoading = true)),
				tap((rating) => this.submitRating(rating)),
			)
			.subscribe();
	}

	ngOnInit(): void {
		this.ratingService.getProductRating(this.productId).subscribe((rating) => {
			this.userRating = rating;
		});
	}

	submitRating(rating: number) {
		this.ratingService.submitRating(this.productId, rating).subscribe(() => {
			this.isLoading = false;
			this.userRating = rating;
		});
	}
}
