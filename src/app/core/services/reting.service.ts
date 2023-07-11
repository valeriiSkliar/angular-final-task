import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MongoService } from './mongo/mongo.service';

@Injectable({
	providedIn: 'root',
})
export class RetingService {
	constructor(private http: HttpClient, private mongoService: MongoService) {}

	getProductRating(productId: string): Observable<number> {
		return this.mongoService.getProductRating(productId);
	}

	submitRating(productId: string, rating: number): Observable<any> {
		const submit = this.mongoService.submitRating(productId, rating);
		this.mongoService.initAverageRating();
		return submit;
	}

	getAverageRating(): Observable<number> {
		return this.mongoService.averageRating;
	}
}
