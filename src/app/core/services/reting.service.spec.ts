import { TestBed } from '@angular/core/testing';

import { RetingService } from './reting.service';

describe('RetingService', () => {
	let service: RetingService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(RetingService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
